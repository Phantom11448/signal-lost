export const ALIEN_BULLETS = ["👽", "🛸", "👾", "🪐", "🌍"];

export function randomBullet() {
  return ALIEN_BULLETS[Math.floor(Math.random() * ALIEN_BULLETS.length)];
}

export function stripContentPunctuation(str) {
  return str.replace(/>([^<]*)</g, (match, content) => {
    return ">" + content.replace(/[!?,;:]/g, "") + "<";
  }).replace(/[!?,;:]\s*$/g, "");
}

export const FEEDBACK = {
  empty: "fire up those engines! type your answer in the box above ☝️",
  no_close: "almost! every opening tag needs a closing tag — don't forget the </tag> at the end",
  wrong_tag: "check the tag name — make sure you're using the right one for this mission",
  wrong_text: "the tag looks right, but check what's written between your tags — it needs to match exactly",
  no_href: "you've got the <a> tag, but it needs an href attribute — try: href=\"...\"",
  wrong_href: "check your href — make sure the web address matches exactly, including the https://",
  no_src: "your <img> tag needs a src attribute — try: src=\"...\"",
  no_alt: "your <img> tag needs an alt attribute too — try: alt=\"description\"",
  missing_h2: "looks like the h2 heading is missing — you need both a heading and a link",
  missing_link: "the heading looks good! now add the <a> link below it",
  no_ul: "you need a <ul> tag on the outside to make a bullet list",
  no_ol: "you need an <ol> tag for a numbered list",
  used_ul: "close! but this mission wants a numbered list — swap <ul> for <ol>",
  no_li: "you've got the list tag, but you need <li> tags inside it for each item",
  generic: "not quite — remember: one missing character can break everything! check spaces, quotes, and tag names carefully",
};
