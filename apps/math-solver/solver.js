(function () {
  "use strict";

  function tokenize(src) {
    const tokens = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) {
        i++;
        continue;
      }
      if (c === "/") {
        throw new Error("Division isn't supported yet — remove the / from your input.");
      }
      if (/[0-9.]/.test(c)) {
        let j = i;
        while (j < src.length && /[0-9.]/.test(src[j])) j++;
        const raw = src.slice(i, j);
        const dots = (raw.match(/\./g) || []).length;
        if (dots > 1 || raw === ".") throw new Error("\"" + raw + "\" is not a valid number.");
        tokens.push({ type: "num", value: parseFloat(raw) });
        i = j;
        continue;
      }
      if (/[a-zA-Z]/.test(c)) {
        if (c.toLowerCase() !== "x") {
          throw new Error("Unknown variable \"" + c + "\" — only x is supported.");
        }
        tokens.push({ type: "var" });
        i++;
        continue;
      }
      if ("+-*^()".indexOf(c) !== -1) {
        tokens.push({ type: c });
        i++;
        continue;
      }
      throw new Error("Unexpected character \"" + c + "\".");
    }
    return tokens;
  }

  function parse(tokens) {
    let pos = 0;

    function peek() {
      return tokens[pos];
    }

    function eat(type) {
      if (peek() && peek().type === type) {
        pos++;
        return true;
      }
      return false;
    }

    function parseExpr() {
      let node = parseTerm();
      while (peek() && (peek().type === "+" || peek().type === "-")) {
        const op = tokens[pos++].type;
        node = { kind: op, left: node, right: parseTerm() };
      }
      return node;
    }

    function startsOperand() {
      const t = peek();
      return t && (t.type === "num" || t.type === "var" || t.type === "(");
    }

    function parseTerm() {
      let node = parseUnary();
      for (;;) {
        if (eat("*")) {
          node = { kind: "*", left: node, right: parseUnary() };
        } else if (startsOperand()) {
          node = { kind: "*", left: node, right: parseUnary() };
        } else {
          return node;
        }
      }
    }

    function parseUnary() {
      if (peek() && (peek().type === "-" || peek().type === "+")) {
        const op = tokens[pos++].type;
        const operand = parseUnary();
        return op === "-" ? { kind: "neg", operand: operand } : operand;
      }
      return parsePower();
    }

    function parsePower() {
      const base = parsePrimary();
      if (eat("^")) {
        return { kind: "^", base: base, exponent: parseUnary() };
      }
      return base;
    }

    function parsePrimary() {
      const t = peek();
      if (!t) throw new Error("The equation ends too early.");
      if (t.type === "num") {
        pos++;
        return { kind: "num", value: t.value };
      }
      if (t.type === "var") {
        pos++;
        return { kind: "var" };
      }
      if (t.type === "(") {
        pos++;
        const inner = parseExpr();
        if (!eat(")")) throw new Error("Missing a closing parenthesis.");
        return inner;
      }
      throw new Error("Unexpected \"" + t.type + "\" in the equation.");
    }

    const tree = parseExpr();
    if (pos < tokens.length) {
      throw new Error("Unexpected \"" + tokens[pos].type + "\" in the equation.");
    }
    return tree;
  }

  function evalTree(node, x) {
    switch (node.kind) {
      case "num":
        return node.value;
      case "var":
        return x;
      case "neg":
        return -evalTree(node.operand, x);
      case "+":
        return evalTree(node.left, x) + evalTree(node.right, x);
      case "-":
        return evalTree(node.left, x) - evalTree(node.right, x);
      case "*":
        return evalTree(node.left, x) * evalTree(node.right, x);
      case "^":
        return Math.pow(evalTree(node.base, x), evalTree(node.exponent, x));
      default:
        throw new Error("Internal error: unknown node.");
    }
  }

  function fmt(n) {
    if (Math.abs(n) < 1e-9) n = 0;
    const rounded = Math.round(n * 1e9) / 1e9;
    return String(rounded);
  }

  function linearForm(a, b) {
    const parts = [];
    if (a !== 0) {
      parts.push(a === 1 ? "x" : a === -1 ? "-x" : fmt(a) + "x");
    }
    if (b !== 0 || parts.length === 0) {
      parts.push(fmt(b));
    }
    return parts.join(" + ").replace(/\+ -/g, "- ");
  }

  function solve(input) {
    const src = String(input).replace(/−/g, "-").replace(/×/g, "*").trim();
    if (!src) throw new Error("Type an equation first, e.g. 2x + 3 = 7.");
    if (src.indexOf("=") === -1) {
      const hasVar = tokenize(src).some(function (t) {
        return t.type === "var";
      });
      if (hasVar) throw new Error("Add an \"=\" to make it an equation, e.g. 2x + 3 = 7.");
      const value = evalTree(parse(tokenize(src)), 0);
      return { solution: fmt(value), steps: ["Just arithmetic — the value is " + fmt(value) + "."] };
    }

    const sides = src.split("=");
    if (sides.length !== 2) throw new Error("Use exactly one \"=\" sign.");
    const left = parse(tokenize(sides[0]));
    const right = parse(tokenize(sides[1]));

    const L = function (v) {
      return evalTree(left, v);
    };
    const R = function (v) {
      return evalTree(right, v);
    };
    const f = function (v) {
      return L(v) - R(v);
    };

    const a = L(1) - L(0);
    const b = L(0);
    const c = R(1) - R(0);
    const d = R(0);

    const d1 = f(1) - f(0);
    const d2 = f(2) - f(1);
    const tolerance = 1e-9 * Math.max(1, Math.abs(d1), Math.abs(d2));
    if (!isFinite(f(0)) || !isFinite(f(1)) || !isFinite(f(2)) || Math.abs(d1 - d2) > tolerance) {
      throw new Error("That doesn't look linear in x — powers of x (like x²) aren't supported yet. Try something like 2x + 3 = 7.");
    }

    const steps = [
      "Left side simplifies to:  " + linearForm(a, b),
      "Right side simplifies to: " + linearForm(c, d),
    ];

    const coeff = a - c;
    const constTerm = d - b;
    steps.push("Move everything to one side:  " + linearForm(coeff, 0) + " = " + fmt(constTerm));

    if (Math.abs(coeff) < 1e-9) {
      if (Math.abs(constTerm) < 1e-9) {
        return { solution: "x = any real number", steps: steps.concat(["Both sides are identical — every x works."]) };
      }
      return { solution: "No solution", steps: steps.concat(["The x terms cancel but the constants differ."]) };
    }

    const x = constTerm / coeff;
    steps.push("x = " + fmt(constTerm) + " ÷ " + fmt(coeff) + " = " + fmt(x));
    return { solution: "x = " + fmt(x), steps: steps };
  }

  if (typeof document !== "undefined") {
    const form = document.getElementById("solver-form");
    const input = document.getElementById("equation");
    const errorBox = document.getElementById("error");
    const resultBox = document.getElementById("result");
    const solutionBox = resultBox.querySelector(".solution");
    const stepsList = resultBox.querySelector(".steps");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      errorBox.hidden = true;
      resultBox.hidden = true;
      try {
        const out = solve(input.value);
        solutionBox.textContent = out.solution;
        stepsList.innerHTML = "";
        out.steps.forEach(function (step) {
          const li = document.createElement("li");
          li.textContent = step;
          stepsList.appendChild(li);
        });
        resultBox.hidden = false;
      } catch (err) {
        errorBox.textContent = err.message;
        errorBox.hidden = false;
      }
    });
  }

  if (typeof globalThis !== "undefined") {
    globalThis.solveEquation = solve;
  }
})();
