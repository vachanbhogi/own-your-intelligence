"""Normalized review schema shared by real (SerpAPI) and fixture corpora."""

from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class Corpus(str, Enum):
    REAL_PLACE = "real_place"
    ACMEPULSE = "acmepulse"


class Source(str, Enum):
    SERPAPI_GOOGLE_MAPS = "serpapi_google_maps"
    FIXTURE = "fixture"


class Review(BaseModel):
    id: str
    corpus: Corpus
    source: Source
    place_name: str
    rating: int = Field(ge=1, le=5)
    text: str
    date: str  # ISO8601 or relative (e.g. "2 weeks ago")
    author: str
    likes: int = 0
    raw: dict[str, Any] = Field(default_factory=dict)


class ReviewMeta(BaseModel):
    place_name: str
    rating: float | None = None
    total_count: int = 0
    fetched_at: str
    place_id: str | None = None


class ReviewCorpus(BaseModel):
    meta: ReviewMeta
    reviews: list[Review]

    def model_dump_json_ready(self) -> dict[str, Any]:
        return self.model_dump(mode="json")


class ThemeKind(str, Enum):
    FEATURE = "feature"
    BUG = "bug"
    PRAISE = "praise"
    OTHER = "other"


class EvidenceQuote(BaseModel):
    review_id: str
    quote: str
    rating: int = Field(ge=1, le=5)


class Theme(BaseModel):
    id: str
    title: str
    kind: ThemeKind
    severity: int = Field(ge=1, le=5, description="Priority / severity 1–5 (5 = most urgent)")
    review_count: int = Field(ge=0)
    summary: str
    evidence_quotes: list[EvidenceQuote] = Field(default_factory=list)
    candidate_action: str = Field(description="What to build or fix")


class ThemeSetMeta(BaseModel):
    corpus_path: str
    place_name: str
    model: str
    clustered_at: str
    input_count: int = 0
    used_count: int = 0


class ThemeSet(BaseModel):
    meta: ThemeSetMeta
    themes: list[Theme]

    def model_dump_json_ready(self) -> dict[str, Any]:
        return self.model_dump(mode="json")


class TicketType(str, Enum):
    PROBLEM = "problem"
    FEATURE = "feature"


class Ticket(BaseModel):
    id: str
    type: TicketType
    title: str
    statement: str = Field(description="Problem or feature idea only — no implementation")
    why_it_matters: str
    priority: int = Field(ge=1, le=5, description="Priority 1–5 (5 = most urgent)")
    review_count: int = Field(ge=0)
    evidence_quotes: list[EvidenceQuote] = Field(default_factory=list)


class TicketSetMeta(BaseModel):
    themes_path: str
    place_name: str
    model: str
    minted_at: str
    input_theme_count: int = 0
    ticket_count: int = 0


class TicketSet(BaseModel):
    meta: TicketSetMeta
    tickets: list[Ticket]

    def model_dump_json_ready(self) -> dict[str, Any]:
        return self.model_dump(mode="json")


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def normalize_serpapi_review(
    raw: dict[str, Any],
    *,
    place_name: str,
    place_id: str | None = None,
) -> Review:
    """Map a SerpAPI google_maps_reviews item into the shared Review schema."""
    snippet = ""
    extracted = raw.get("extracted_snippet")
    if isinstance(extracted, dict):
        snippet = (extracted.get("original") or extracted.get("snippet") or "").strip()
    if not snippet:
        snippet = (raw.get("snippet") or raw.get("description") or "").strip()

    user = raw.get("user") or {}
    author = ""
    if isinstance(user, dict):
        author = (user.get("name") or "").strip()
    if not author:
        author = (raw.get("author") or raw.get("username") or "Anonymous").strip()

    review_id = (
        raw.get("review_id")
        or raw.get("id")
        or f"serpapi-{hash((author, snippet, raw.get('iso_date') or raw.get('date'))) & 0xFFFFFFFF:08x}"
    )

    rating_raw = raw.get("rating")
    try:
        rating = int(rating_raw) if rating_raw is not None else 3
    except (TypeError, ValueError):
        rating = 3
    rating = max(1, min(5, rating))

    date = (
        raw.get("iso_date")
        or raw.get("date")
        or raw.get("published_date")
        or ""
    )
    if not isinstance(date, str):
        date = str(date)

    likes_raw = raw.get("likes") or raw.get("thumbs_up") or 0
    try:
        likes = int(likes_raw)
    except (TypeError, ValueError):
        likes = 0

    return Review(
        id=str(review_id),
        corpus=Corpus.REAL_PLACE,
        source=Source.SERPAPI_GOOGLE_MAPS,
        place_name=place_name,
        rating=rating,
        text=snippet,
        date=date,
        author=author or "Anonymous",
        likes=likes,
        raw={**raw, "_place_id": place_id} if place_id else dict(raw),
    )


def wrap_corpus(
    reviews: list[Review],
    *,
    place_name: str,
    place_id: str | None = None,
    rating: float | None = None,
    fetched_at: str | None = None,
) -> ReviewCorpus:
    return ReviewCorpus(
        meta=ReviewMeta(
            place_name=place_name,
            rating=rating,
            total_count=len(reviews),
            fetched_at=fetched_at or utc_now_iso(),
            place_id=place_id,
        ),
        reviews=reviews,
    )
