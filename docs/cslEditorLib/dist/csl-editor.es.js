function c(r) {
  return new Promise((t, e) => {
    r.oncomplete = r.onsuccess = () => t(r.result), r.onabort = r.onerror = () => e(r.error);
  });
}
function D(r, t) {
  let e;
  const n = () => {
    if (e)
      return e;
    const o = indexedDB.open(r);
    return o.onupgradeneeded = () => o.result.createObjectStore(t), e = c(o), e.then((l) => {
      l.onclose = () => e = void 0;
    }, () => {
    }), e;
  };
  return (o, l) => n().then((a) => l(a.transaction(t, o).objectStore(t)));
}
let w;
function h() {
  return w || (w = D("keyval-store", "keyval")), w;
}
function p(r, t = h()) {
  return t("readonly", (e) => c(e.get(r)));
}
function f(r, t, e = h()) {
  return e("readwrite", (n) => (n.put(t, r), c(n.transaction)));
}
function F(r = h()) {
  return r("readwrite", (t) => (t.clear(), c(t.transaction)));
}
const d = "2.0.1", A = "csl-style-", S = "csl-style-index";
let I = "./generated/styles/", m = "./generated/styleIndex.json";
class P {
  constructor() {
    this.styleIndex = null, this.loadingPromises = /* @__PURE__ */ new Map();
  }
  /**
   * Set the base path for loading styles
   * Useful when the library is used in different contexts
   * @param {string} basePath - e.g., '/cslEditorLib/' or './'
   */
  setBasePath(t) {
    I = t + "generated/styles/", m = t + "generated/styleIndex.json";
  }
  /**
   * Initialize the style loader by loading the style index
   */
  async init() {
    if (this.styleIndex)
      return this.styleIndex;
    const t = await p(S);
    if (t && t.version === d)
      return this.styleIndex = t.data, this.styleIndex;
    try {
      const e = await fetch(m);
      if (!e.ok)
        throw new Error(`Failed to load style index: ${e.statusText}`);
      const n = await e.json();
      return this.styleIndex = n, await f(S, {
        version: d,
        data: n,
        timestamp: Date.now()
      }), this.styleIndex;
    } catch (e) {
      throw console.error("Error loading style index:", e), e;
    }
  }
  /**
   * Get the master (independent) style ID for any style ID
   */
  getMasterId(t) {
    if (!this.styleIndex)
      throw new Error("Style index not loaded. Call init() first.");
    return this.styleIndex.masterIdFromId[t] || t;
  }
  /**
   * Get the title for a style ID
   */
  getStyleTitle(t) {
    if (!this.styleIndex)
      throw new Error("Style index not loaded. Call init() first.");
    return this.styleIndex.styleTitleFromId[t] || "Unknown Style";
  }
  /**
   * Check if a style is dependent (has a different master ID)
   */
  isDependent(t) {
    return this.getMasterId(t) !== t;
  }
  /**
   * Load a style's CSL content
   * Returns the actual CSL XML content for independent styles
   */
  async loadStyle(t) {
    const e = this.getMasterId(t);
    if (this.loadingPromises.has(e))
      return this.loadingPromises.get(e);
    const n = this._loadStyleInternal(e);
    this.loadingPromises.set(e, n);
    try {
      return await n;
    } finally {
      this.loadingPromises.delete(e);
    }
  }
  async _loadStyleInternal(t) {
    const e = A + t, n = await p(e);
    if (n && n.version === d)
      return n.data;
    const o = this.styleIndex.styleFileFromId[t];
    if (!o)
      throw new Error(`Style not found: ${t}`);
    const l = `${I}${o}.json`;
    try {
      const a = await fetch(l);
      if (!a.ok)
        throw new Error(`Failed to load style: ${a.statusText}`);
      const u = await a.json();
      return await f(e, {
        version: d,
        data: u,
        timestamp: Date.now()
      }), u;
    } catch (a) {
      throw console.error(`Error loading style ${t}:`, a), a;
    }
  }
  /**
   * Load multiple styles in parallel
   */
  async loadStyles(t) {
    const e = t.map((n) => this.loadStyle(n));
    return Promise.all(e);
  }
  /**
   * Search for styles by title
   */
  searchByTitle(t) {
    if (!this.styleIndex)
      throw new Error("Style index not loaded. Call init() first.");
    const e = t.toLowerCase(), n = [];
    for (const [o, l] of Object.entries(this.styleIndex.styleTitleFromId))
      l.toLowerCase().includes(e) && n.push({
        id: o,
        title: l,
        masterId: this.getMasterId(o),
        isDependent: this.isDependent(o)
      });
    return n;
  }
  /**
   * Get all style IDs
   */
  getAllStyleIds() {
    if (!this.styleIndex)
      throw new Error("Style index not loaded. Call init() first.");
    return Object.keys(this.styleIndex.styleTitleFromId);
  }
  /**
   * Get all independent (master) style IDs
   */
  getIndependentStyleIds() {
    if (!this.styleIndex)
      throw new Error("Style index not loaded. Call init() first.");
    const t = [];
    for (const [e, n] of Object.entries(this.styleIndex.masterIdFromId))
      e === n && t.push(e);
    return t;
  }
  /**
   * Clear all cached styles
   */
  async clearCache() {
    await F();
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return this.styleIndex ? {
      totalStyles: this.styleIndex.totalStyles,
      independentStyles: this.styleIndex.independentStyles,
      dependentStyles: this.styleIndex.dependentStyles,
      generatedAt: this.styleIndex.generatedAt
    } : null;
  }
}
const i = new P();
let s = !1;
const x = "http://www.zotero.org/styles/apa", z = [
  "http://www.zotero.org/styles/apa",
  "http://www.zotero.org/styles/ieee",
  "http://www.zotero.org/styles/harvard-cite-them-right",
  "http://www.zotero.org/styles/nature",
  "http://www.zotero.org/styles/american-medical-association",
  "http://www.zotero.org/styles/chicago-author-date",
  "http://www.zotero.org/styles/american-political-science-association",
  "http://www.zotero.org/styles/vancouver",
  "http://www.zotero.org/styles/american-sociological-association",
  "http://www.zotero.org/styles/modern-language-association",
  "http://www.zotero.org/styles/mhra-notes",
  "http://www.zotero.org/styles/chicago-shortened-notes-bibliography",
  "http://www.zotero.org/styles/associacao-brasileira-de-normas-tecnicas",
  "http://www.zotero.org/styles/chicago-notes-bibliography",
  "http://www.zotero.org/styles/national-library-of-medicine",
  "http://www.zotero.org/styles/american-chemical-society",
  "http://www.zotero.org/styles/cell",
  "http://www.zotero.org/styles/science",
  "http://www.zotero.org/styles/elsevier-with-titles",
  "http://www.zotero.org/styles/ecology",
  "http://www.zotero.org/styles/elsevier-harvard",
  "http://www.zotero.org/styles/royal-society-of-chemistry",
  "http://www.zotero.org/styles/journal-of-the-american-chemical-society",
  "http://www.zotero.org/styles/pnas"
];
async function y() {
  s || (await i.init(), s = !0);
}
function g(r) {
  return r.replace(/&/g, "and").replace(/\([A-Z]*\)/g, "").replace(/\([^(]*\)$/, "").replace(/\[[^\[]*\]$/, "").replace(/[()[\]]/g, "").replace(/[,'.]/g, "").replace(/[\\/:\"*?<>| ]+/g, "-").replace(/--+/g, "-").replace(/-$/, "").toLowerCase().replace(/[àáäâãáà]/g, "a").replace(/[èéëêéè]/g, "e").replace(/[ìíïî]/g, "i").replace(/[òóöô]/g, "o").replace(/[ùúüû]/g, "u").replace(/[ñ]/g, "n").replace(/[çç]/g, "c");
}
function C(r) {
  return "http://www.zotero.org/styles/" + g(r);
}
function E(r) {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.getMasterId(r);
}
function b(r) {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.getStyleTitle(r);
}
async function _(r) {
  return s || await y(), (await i.loadStyle(r)).csl;
}
function v() {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.getAllStyleIds();
}
function L() {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.getIndependentStyleIds();
}
function T(r) {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.searchByTitle(r);
}
function j() {
  if (!s)
    throw new Error("CSL Styles not initialized. Call init() first.");
  return i.getStats();
}
const $ = {
  init: y,
  getNormalisedStyleTitle: g,
  generateStyleId: C,
  getMasterIdFromId: E,
  getStyleTitle: b,
  loadStyleXml: _,
  getAllStyleIds: v,
  getIndependentStyleIds: L,
  searchByTitle: T,
  getStats: j,
  defaultStyleId: x,
  topStyles: z
}, M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $,
  defaultStyleId: x,
  generateStyleId: C,
  getAllStyleIds: v,
  getIndependentStyleIds: L,
  getMasterIdFromId: E,
  getNormalisedStyleTitle: g,
  getStats: j,
  getStyleTitle: b,
  init: y,
  loadStyleXml: _,
  searchByTitle: T,
  topStyles: z
}, Symbol.toStringTag, { value: "Module" })), B = {
  cslStyles: M,
  styleLoader: i,
  version: "2.0.0"
};
async function O() {
  await y();
}
export {
  M as cslStyles,
  B as default,
  O as init,
  i as styleLoader
};
//# sourceMappingURL=csl-editor.es.js.map
