import { stripContentPunctuation } from '../constants/feedback.js';

const MISSIONS = [
  {
    id: 1,
    title: "Repair the Antenna",
    subtitle: "Tags & Headings",
    badge: "ðŸ“¡",
    badgeName: "Antenna Core",
    shipPart: "ANTENNA MODULE",
    storyIntro: "Your ship's antenna is offline. To send any signal, you must first learn the basic building blocks of human web communication â€” HTML tags.",
    theory: [
      {
        heading: "Fix the Phasers",
        body: "Think of HTML tags like a label gun at a warehouse. You wrap a label around something so everyone knows what it is. The label has two parts â€” one that says where it starts and one that says where it ends. Everything in between is the content. There are lots of different tags, each with a different job: <h1> for big titles, <p> for regular sentences, <button> for clickable buttons. They all follow the same pattern: open it, put your content in, close it.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1> opening tag", explain: "Opens the tag â€” the tag name tells the browser what this content IS" },
          { text: "Hello Earth", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want to show â€” text, words, anything" },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1> closing tag", explain: "Closes the tag â€” the / means 'this tag ends here'. Must match the opening tag" },
        ],
        miniChallenge: {
          id: "m1a", xp: 20,
          instruction: ["Fix the phasers! Wrap the word: Hello â€” in ANY tag you like. Pick one:", "<h1>Hello</h1>", "<p>Hello</p>", "<h2>Hello</h2>"],
          hint1: "Try: <p>Hello</p> or <h1>Hello</h1>",
          hint2: "<p>Hello</p>",
          hint3: "<p>Hello</p>",
          walkthrough: ["Pick any tag â€” let's use <p>", "Type: <p>", "Add the word: Hello", "Close it: </p>", "Full answer: <p>Hello</p>"],
          smartCheck: (v) => {
            const n = v.toLowerCase().replace(/[.!?,]/g, "");
            if (!n.trim()) return "empty";
            if (/<[a-z][a-z0-9]*>\s*hello\s*<\/[a-z][a-z0-9]*>/.test(n)) return "pass";
            if (/<[a-z]+>/.test(n) && !/<\/[a-z]+>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Reboot the Holographic Display",
        body: "Headings work like the text on a movie poster. The big title at the top is huge â€” that is h1. The actor names underneath are medium â€” that is h2 or h3. The fine print at the bottom that nobody reads â€” that is h6. The browser automatically makes h1 the biggest and h6 the smallest. You just pick the right number for how important that heading is.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1>", explain: "The biggest heading â€” like the title of a transmission" },
          { text: "DISTRESS SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want the heading to say" },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1>", explain: "Closes THIS heading â€” every tag you open, you must close with a matching tag" },
        ],
        miniChallenge: {
          id: "m1b", xp: 20,
          instruction: "Reboot the holographic display! Write an h1 heading that says: My First Page",
          hint1: "Use <h1> for the biggest heading",
          hint2: "<h1>â€¦</h1>",
          hint3: "<h1>My First Page</h1>",
          walkthrough: ["Open with: <h1>", "Type: My First Page", "Close with: </h1>", "Full answer: <h1>My First Page</h1>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<h1>\s*my first page\s*<\/h1>/.test(n)) return "pass";
            if (/<h1\s*>/.test(n) && !/<\/h1>/.test(n)) return "no_close";
            if (!/<h1/.test(n)) return "wrong_tag";
            if (/<h1>[^<]*<\/h1>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Hack the Mainframe",
        body: "A <p> tag is like a paragraph in a book or newspaper â€” it is one block of regular readable text. Every time you start a new topic or new block of sentences, you wrap it in its own <p> tag. The browser adds a little space between paragraphs automatically so they do not all run together.",
        anatomy: [
          { text: "<p>", color: "#00f5c4", highlight: "#00f5c4", label: "<p>", explain: "Opens a paragraph" },
          { text: "Help! My ship has crashed on sector 7.", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "Normal readable text goes here" },
          { text: "</p>", color: "#00f5c4", highlight: "#00f5c4", label: "</p>", explain: "Closes THIS paragraph â€” the name inside must always match your opening tag" },
        ],
        miniChallenge: {
          id: "m1c", xp: 20,
          instruction: "Hack the mainframe! Write a paragraph that says: I am learning HTML!",
          hint1: "Use the <p> tag for normal text",
          hint2: "<p>â€¦</p>",
          hint3: "<p>I am learning HTML!</p>",
          walkthrough: ["Open with: <p>", "Type: I am learning HTML!", "Close with: </p>", "Full answer: <p>I am learning HTML!</p>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p>\s*i am learning html[!]?\s*<\/p>/.test(n)) return "pass";
            if (/<p\s*>/.test(n) && !/<\/p>/.test(n)) return "no_close";
            if (!/<p/.test(n)) return "wrong_tag";
            if (/<p>[^<]*<\/p>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss1", xp: 50,
      instruction: ["ðŸ›¸ Reactivate the beacon!", "Write an h2 heading that says: About Me", "Then write a paragraph that says: I come in peace."],
      hint1: "You need two tags â€” an h2 heading and then a <p> paragraph below it",
      hint2: "<h2>About Me</h2>  then  <p>I come in peace.</p>",
      hint3: "<h2>About Me</h2><p>I come in peace.</p>",
      walkthrough: ["Write the heading: <h2>About Me</h2>", "Then write the paragraph: <p>I come in peace.</p>", "Full answer: <h2>About Me</h2><p>I come in peace.</p>"],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        if (/<h2>\s*about me\s*<\/h2>/.test(n) && /<p>\s*i come in peace[.]?\s*<\/p>/.test(n)) return "pass";
        if (!/<h2/.test(n)) return "wrong_tag";
        if (!/<p/.test(n)) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 2,
    title: "Restore the Nav System",
    subtitle: "Links & Images",
    badge: "ðŸ›¸",
    badgeName: "Nav Core",
    shipPart: "NAVIGATION MODULE",
    storyIntro: "Antenna online! Now your navigation system needs repairs. You need to learn how to create links and load images â€” the coordinates and star maps of the web.",
    theory: [
      {
        heading: "Override the Tractor Beam",
        body: "Some tags need extra instructions â€” like a shipping label that says FRAGILE or THIS SIDE UP. Those extra instructions are called attributes. They live inside the opening tag and always follow this pattern: name=\"value\". The name says what kind of instruction it is, and the value in quotes says what the instruction actually is.",
        anatomy: [
          { text: "<a ", color: "#00f5c4", highlight: "#00f5c4", label: "<a", explain: "Opens a link tag (a stands for anchor â€” like anchoring a ship to a location)" },
          { text: "href=", color: "#ffe94d", highlight: "#ffe94d", label: "href=", explain: "An attribute â€” tells the browser where the link goes" },
          { text: '"https://google.com"', color: "#39ff14", highlight: "#39ff14", label: '"address"', explain: "The web address â€” always wrapped in quotes" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag â€” link content starts now" },
          { text: "Click me!", color: "#c8f0ff", highlight: "#a98dff", label: "link text", explain: "The words humans see and click on the page" },
          { text: "</a>", color: "#00f5c4", highlight: "#00f5c4", label: "</a>", explain: "Closes THIS link â€” matches the <a> you opened" },
        ],
        miniChallenge: {
          id: "m2a", xp: 25,
          instruction: "Override the tractor beam! Write a link that goes to https://google.com and says: Visit Google",
          hint1: "Links use <a> with an href attribute inside the opening tag",
          hint2: '<a href="https://google.com">â€¦</a>',
          hint3: '<a href="https://google.com">Visit Google</a>',
          walkthrough: ['Start the tag: <a', 'Add the href: href="https://google.com"', 'Close the opening tag: >', 'Add link text: Visit Google', 'Close it: </a>', 'Full answer: <a href="https://google.com">Visit Google</a>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<a/.test(n)) return "wrong_tag";
            if (/<a/.test(n) && !/<\/a>/.test(n)) return "no_close";
            if (!/href/.test(n)) return "no_href";
            if (/href/.test(n) && !/google/.test(n)) return "wrong_href";
            if (/<a[^>]*href="https:\/\/google\.com"[^>]*>\s*visit google\s*<\/a>/.test(n)) return "pass";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Deploy the Recon Probe",
        body: "Adding an image is like taping a photo to a wall. The src attribute is the address of where the photo lives â€” either on your computer or somewhere on the internet. The alt attribute is a caption you write for people who cannot see the image â€” maybe they are blind and using a screen reader, or maybe the image failed to load. Always include both.",
        anatomy: [
          { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "The image tag â€” no closing tag needed, it stands alone!" },
          { text: "src=", color: "#ffe94d", highlight: "#ffe94d", label: "src=", explain: "Short for 'source' â€” the address of the image file" },
          { text: '"photo.jpg" ', color: "#39ff14", highlight: "#39ff14", label: '"image address"', explain: "Where the image is stored" },
          { text: "alt=", color: "#ffe94d", highlight: "#ffe94d", label: "alt=", explain: "A plain-words description of the image for those who can't see it" },
          { text: '"a photo"', color: "#39ff14", highlight: "#39ff14", label: '"description"', explain: "Describe what the image shows" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag â€” no </img> needed, this one stands alone" },
        ],
        miniChallenge: {
          id: "m2b", xp: 25,
          instruction: 'Deploy the recon probe! Write an image tag with src="photo.jpg" and alt="my photo"',
          hint1: "Image tags use <img> and don't need a closing tag",
          hint2: '<img src="â€¦" alt="â€¦">',
          hint3: '<img src="photo.jpg" alt="my photo">',
          walkthrough: ['Start with: <img', 'Add src: src="photo.jpg"', 'Add alt: alt="my photo"', 'Close it: >', 'Full answer: <img src="photo.jpg" alt="my photo">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!/src/.test(n)) return "no_src";
            if (!/alt/.test(n)) return "no_alt";
            if (/<img[^>]*src="photo\.jpg"[^>]*alt="my photo"[^>]*>/.test(n) || /<img[^>]*alt="my photo"[^>]*src="photo\.jpg"[^>]*>/.test(n)) return "pass";
            return "generic";
          },
        },
      },
      {
        heading: "Recalibrate the Warp Core",
        body: "Now you know how to make a door people can walk through (links) and hang photos on the wall (images). Here is what a real page looks like when you combine both of those with a heading:",
        codeBlock: `<h1>Alien Distress Signal</h1>\n<a href="https://google.com">Contact Earth</a>\n<img src="crash-site.jpg" alt="crash site photo">`,
        miniChallenge: {
          id: "m2c", xp: 25,
          instruction: 'Recalibrate the warp core! Write an h2 that says "My Links" â€” then below it a link to https://nasa.gov that says: Contact NASA',
          hint1: "You need two tags â€” an h2 heading and then an <a> link below it",
          hint2: '<h2>My Links</h2>  then  <a href="https://nasa.gov">â€¦</a>',
          hint3: '<h2>My Links</h2><a href="https://nasa.gov">Contact NASA</a>',
          walkthrough: ['Write the heading: <h2>My Links</h2>', 'Start the link: <a', 'Add href: href="https://nasa.gov"', 'Add text and close: >Contact NASA</a>', 'Full answer: <h2>My Links</h2><a href="https://nasa.gov">Contact NASA</a>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<h2/.test(n)) return "missing_h2";
            if (!/<a/.test(n)) return "missing_link";
            if (/<h2>\s*my links\s*<\/h2>/.test(n) && /<a[^>]*href="https:\/\/nasa\.gov"[^>]*>\s*contact nasa\s*<\/a>/.test(n)) return "pass";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss2", xp: 50,
      instruction: ["ðŸ›¸ Engage the hyperspace relay!", "Write an h1 that says: My Signal Page", "Write a link to https://google.com that says: Earth Search", 'Write an image with src="alien.jpg" and alt="alien ship"'],
      hint1: "Three tags â€” an h1, then an <a> link, then an <img>",
      hint2: '<h1>â€¦</h1>  <a href="â€¦">â€¦</a>  <img src="â€¦" alt="â€¦">',
      hint3: '<h1>My Signal Page</h1><a href="https://google.com">Earth Search</a><img src="alien.jpg" alt="alien ship">',
      walkthrough: ['Write: <h1>My Signal Page</h1>', 'Then: <a href="https://google.com">Earth Search</a>', 'Then: <img src="alien.jpg" alt="alien ship">', 'Put all three together on separate lines'],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasH1 = /<h1>\s*my signal page\s*<\/h1>/.test(n);
        const hasLink = /<a[^>]*href="https:\/\/google\.com"[^>]*>\s*earth search\s*<\/a>/.test(n);
        const hasImg = /<img[^>]*src="alien\.jpg"[^>]*alt="alien ship"[^>]*>/.test(n) || /<img[^>]*alt="alien ship"[^>]*src="alien\.jpg"[^>]*>/.test(n);
        if (hasH1 && hasLink && hasImg) return "pass";
        if (!hasH1) return "wrong_text";
        if (!hasLink) return "missing_link";
        if (!hasImg) return "no_src";
        return "generic";
      },
    },
  },
  {
    id: 3,
    title: "Power the Life Support",
    subtitle: "Lists & Buttons",
    badge: "âš¡",
    badgeName: "Power Core",
    shipPart: "POWER MODULE",
    storyIntro: "Navigation online! Your life support systems are flickering. To stabilize them you need to organize your distress data into lists and add an emergency contact button.",
    theory: [
      {
        heading: "Defrag the Memory Banks",
        body: "An unordered list is like a grocery list on your fridge. The order does not matter â€” milk, eggs, bread, whatever order you write them is fine. Each item gets a bullet point automatically. The <ul> is the whole list, and each <li> is one item on that list. The li tags live INSIDE the ul â€” like items inside a bag.",
        anatomy: [
          { text: "<ul>", color: "#ffe94d", highlight: "#ffe94d", label: "<ul>", explain: "Opens the list â€” ul means unordered list (bullet points)" },
          { text: "<li>", color: "#00f5c4", highlight: "#00f5c4", label: "<li>", explain: "Opens one list item â€” li means list item" },
          { text: "Oxygen low", color: "#c8f0ff", highlight: "#39ff14", label: "item text", explain: "The text that shows up as a bullet point" },
          { text: "</li>", color: "#00f5c4", highlight: "#00f5c4", label: "</li>", explain: "Closes THIS list item â€” each <li> needs its own closing tag" },
          { text: "</ul>", color: "#ffe94d", highlight: "#ffe94d", label: "</ul>", explain: "Closes the whole list â€” must come after ALL your list items" },
        ],
        miniChallenge: {
          id: "m3a", xp: 25,
          instruction: "Defrag the memory banks! Write an unordered list with two items: Apples and Bananas",
          hint1: "You need a <ul> tag on the outside and <li> tags inside it",
          hint2: "<ul><li>â€¦</li><li>â€¦</li></ul>",
          hint3: "<ul><li>Apples</li><li>Bananas</li></ul>",
          walkthrough: ["Open the list: <ul>", "Add first item: <li>Apples</li>", "Add second item: <li>Bananas</li>", "Close the list: </ul>", "Full answer: <ul><li>Apples</li><li>Bananas</li></ul>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<ul/.test(n)) return "no_ul";
            if (!/<li/.test(n)) return "no_li";
            if (/<ul/.test(n) && !/<\/ul>/.test(n)) return "no_close";
            if (/<ul[\s\S]*<li[\s\S]*apples[\s\S]*<\/li>[\s\S]*<li[\s\S]*bananas[\s\S]*<\/li>[\s\S]*<\/ul>/.test(n)) return "pass";
            if (!/apples/.test(n) || !/bananas/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Override the Autopilot",
        body: "An ordered list is like a recipe or a how-to guide â€” the order matters. Step 1 before step 2, always. Swap <ul> for <ol> and the browser automatically puts 1, 2, 3 in front of each item. You never have to type the numbers yourself â€” if you add or remove a step, the browser renumbers everything for you.",
        anatomy: [
          { text: "<ol>", color: "#ff9f43", highlight: "#ff9f43", label: "<ol>", explain: "Opens a numbered list â€” ol means ordered list" },
          { text: "<li>", color: "#00f5c4", highlight: "#00f5c4", label: "<li>", explain: "Each item still uses <li> â€” same as in a bullet list" },
          { text: "Send rescue ship", color: "#c8f0ff", highlight: "#39ff14", label: "item text", explain: "The browser automatically puts '1.' in front of this" },
          { text: "</li>", color: "#00f5c4", highlight: "#00f5c4", label: "</li>", explain: "Closes THIS list item" },
          { text: "</ol>", color: "#ff9f43", highlight: "#ff9f43", label: "</ol>", explain: "Closes THIS numbered list â€” goes after all your items" },
        ],
        miniChallenge: {
          id: "m3b", xp: 25,
          instruction: "Override the autopilot! Write a numbered list with two steps: Wake up and Eat breakfast",
          hint1: "Same as a bullet list but use <ol> instead of <ul>",
          hint2: "<ol><li>â€¦</li><li>â€¦</li></ol>",
          hint3: "<ol><li>Wake up</li><li>Eat breakfast</li></ol>",
          walkthrough: ["Open the numbered list: <ol>", "Add step one: <li>Wake up</li>", "Add step two: <li>Eat breakfast</li>", "Close the list: </ol>", "Full answer: <ol><li>Wake up</li><li>Eat breakfast</li></ol>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<ol/.test(n) && /<ul/.test(n)) return "used_ul";
            if (!/<ol/.test(n)) return "no_ol";
            if (!/<li/.test(n)) return "no_li";
            if (/<ol/.test(n) && !/<\/ol>/.test(n)) return "no_close";
            if (/<ol[\s\S]*<li[\s\S]*wake up[\s\S]*<\/li>[\s\S]*<li[\s\S]*eat breakfast[\s\S]*<\/li>[\s\S]*<\/ol>/.test(n)) return "pass";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Arm the Escape Pod",
        body: "A button is literally just a button. You put words on it, people click it. Right now it does not do anything on its own â€” that comes later when you learn JavaScript. But writing the button itself is as simple as wrapping your text in a <button> tag. The browser automatically makes it look clickable.",
        anatomy: [
          { text: "<button>", color: "#00f5c4", highlight: "#00f5c4", label: "<button>", explain: "Opens the button tag" },
          { text: "SEND RESCUE SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "button text", explain: "Whatever words appear on the button" },
          { text: "</button>", color: "#00f5c4", highlight: "#00f5c4", label: "</button>", explain: "Closes THIS button â€” matches the <button> you opened" },
        ],
        miniChallenge: {
          id: "m3c", xp: 25,
          instruction: "Arm the escape pod! Write a button that says: Get Started",
          hint1: "Buttons use the <button> tag â€” just like <p> but for buttons",
          hint2: "<button>â€¦</button>",
          hint3: "<button>Get Started</button>",
          walkthrough: ["Open: <button>", "Add text: Get Started", "Close: </button>", "Full answer: <button>Get Started</button>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<button/.test(n)) return "wrong_tag";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            if (/<button>\s*get started\s*<\/button>/.test(n)) return "pass";
            if (/<button>[^<]*<\/button>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Life Support Status Check",
        body: "Here is what it looks like when you put a heading, a bullet list, a numbered list, and a button all on the same page. This is basically the structure of half the websites on the internet:",
        codeBlock: `<h1>DISTRESS SIGNAL â€” SECTOR 7</h1>\n\n<ul>\n  <li>Oxygen: 12%</li>\n  <li>Fuel: Empty</li>\n</ul>\n\n<ol>\n  <li>Locate crash site</li>\n  <li>Send rescue ship</li>\n</ol>\n\n<button>SEND RESCUE SIGNAL</button>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss3", xp: 50,
      instruction: ["ðŸ›¸ Stabilize the life support grid!", "Write a bullet list with two items: Engine offline and Fuel empty", "Then write a button that says: Send SOS"],
      hint1: "You need a <ul> list with two <li> items, then a <button> below it",
      hint2: "<ul><li>â€¦</li><li>â€¦</li></ul>  then  <button>â€¦</button>",
      hint3: "<ul><li>Engine offline</li><li>Fuel empty</li></ul><button>Send SOS</button>",
      walkthrough: ["Write the list: <ul>", "Add: <li>Engine offline</li>", "Add: <li>Fuel empty</li>", "Close: </ul>", "Then add: <button>Send SOS</button>", "Full answer: <ul><li>Engine offline</li><li>Fuel empty</li></ul><button>Send SOS</button>"],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasList = /<ul[\s\S]*<li[\s\S]*engine offline[\s\S]*<\/li>[\s\S]*<li[\s\S]*fuel empty[\s\S]*<\/li>[\s\S]*<\/ul>/.test(n);
        const hasButton = /<button>\s*send sos\s*<\/button>/.test(n);
        if (hasList && hasButton) return "pass";
        if (!/<ul/.test(n)) return "no_ul";
        if (!/<button/.test(n)) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 4,
    title: "Restore the Ship Log",
    subtitle: "Text Formatting",
    badge: "ðŸ“Ÿ",
    badgeName: "Log Core",
    shipPart: "LOG MODULE",
    storyIntro: "Power restored! Your ship log display is damaged â€” all text looks the same with no formatting. Restore the text formatting system so your distress message is clear and important parts stand out.",
    theory: [
      {
        heading: "Boost the Signal Amplifier",
        body: "The <strong> tag is like using a highlighter on the most important word in a sentence. The browser makes it bold automatically. Use it sparingly â€” if everything is bold, nothing stands out. Save it for the words that really matter, like a warning or a key piece of information.",
        anatomy: [
          { text: "<strong>", color: "#00f5c4", highlight: "#00f5c4", label: "<strong>", explain: "Opens the bold tag â€” everything inside will appear bold" },
          { text: "WARNING:", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will be displayed in bold" },
          { text: "</strong>", color: "#00f5c4", highlight: "#00f5c4", label: "</strong>", explain: "Closes THIS bold tag â€” matches the <strong> you opened" },
        ],
        miniChallenge: {
          id: "m4a", xp: 20,
          instruction: "Boost the signal amplifier! Make the word MAYDAY bold using the <strong> tag",
          hint1: "Wrap the word in <strong> tags",
          hint2: "<strong>...</strong>",
          hint3: "<strong>MAYDAY</strong>",
          walkthrough: ["Open with: <strong>", "Type: MAYDAY", "Close with: </strong>", "Full answer: <strong>MAYDAY</strong>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<strong>\s*mayday\s*<\/strong>/.test(n)) return "pass";
            if (/<strong>/.test(n) && !/<\/strong>/.test(n)) return "no_close";
            if (!/<strong/.test(n)) return "wrong_tag";
            if (/<strong>[^<]*<\/strong>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Engage Stealth Mode",
        body: "The <em> tag is like air-quoting something when you say it out loud â€” or putting a little stress on a word. Em stands for emphasis. The browser makes it italic. Use it for titles of things, technical terms you are introducing for the first time, or words you would naturally say with a slightly different tone.",
        anatomy: [
          { text: "<em>", color: "#ffe94d", highlight: "#ffe94d", label: "<em>", explain: "Opens the italic tag â€” em stands for emphasis" },
          { text: "Sector Seven", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will appear in italic" },
          { text: "</em>", color: "#ffe94d", highlight: "#ffe94d", label: "</em>", explain: "Closes THIS italic tag â€” matches the <em> you opened" },
        ],
        miniChallenge: {
          id: "m4b", xp: 20,
          instruction: "Engage stealth mode! Make the phrase: crash landing â€” italic using the <em> tag",
          hint1: "Wrap the phrase in <em> tags",
          hint2: "<em>...</em>",
          hint3: "<em>crash landing</em>",
          walkthrough: ["Open with: <em>", "Type: crash landing", "Close with: </em>", "Full answer: <em>crash landing</em>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<em>\s*crash landing\s*<\/em>/.test(n)) return "pass";
            if (/<em>/.test(n) && !/<\/em>/.test(n)) return "no_close";
            if (!/<em/.test(n)) return "wrong_tag";
            if (/<em>[^<]*<\/em>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Double Encrypt the Transmission",
        body: "You can put tags inside other tags â€” like a letter inside an envelope inside a box. Each wrapper adds its own effect. Putting <em> inside <strong> gives you text that is bold AND italic at the same time. The rule is: always close the inner tag before you close the outer one. Last one opened, first one closed.",
        anatomy: [
          { text: "<strong>", color: "#00f5c4", highlight: "#00f5c4", label: "<strong>", explain: "Opens bold â€” everything inside will be bold" },
          { text: "<em>", color: "#ffe94d", highlight: "#ffe94d", label: "<em>", explain: "Opens italic inside bold â€” this text is now BOTH" },
          { text: "Critical alert", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will be bold AND italic" },
          { text: "</em>", color: "#ffe94d", highlight: "#ffe94d", label: "</em>", explain: "Closes italic â€” always close inner tags first" },
          { text: "</strong>", color: "#00f5c4", highlight: "#00f5c4", label: "</strong>", explain: "Closes bold â€” outer tags close last" },
        ],
        miniChallenge: {
          id: "m4c", xp: 25,
          instruction: "Double encrypt the transmission! Make the text: SOS â€” both bold AND italic by nesting <em> inside <strong>",
          hint1: "Put <em> inside <strong> â€” open strong first, then em",
          hint2: "<strong><em>...</em></strong>",
          hint3: "<strong><em>SOS</em></strong>",
          walkthrough: ["Open bold: <strong>", "Open italic inside it: <em>", "Type: SOS", "Close italic first: </em>", "Close bold last: </strong>", "Full answer: <strong><em>SOS</em></strong>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<strong>\s*<em>\s*sos\s*<\/em>\s*<\/strong>/.test(n)) return "pass";
            if (/<strong>/.test(n) && !/<em>/.test(n)) return "wrong_tag";
            if (/<em>/.test(n) && !/<\/em>/.test(n)) return "no_close";
            if (/<strong><em>[^<]*<\/em><\/strong>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Vent the Plasma Conduits",
        body: "<br> is the Enter key of HTML â€” it just drops you to the next line without starting a whole new paragraph. <hr> is like dragging a ruler across the page to draw a dividing line between two sections. Neither of them wraps around any content, so neither of them needs a closing tag â€” they just do their thing and that is it.",
        anatomy: [
          { text: "Crew: 1", color: "#c8f0ff", highlight: "#39ff14", label: "first line", explain: "Regular text on the first line" },
          { text: "<br>", color: "#00f5c4", highlight: "#00f5c4", label: "<br>", explain: "Line break â€” jumps to the next line. No closing tag!" },
          { text: "Fuel: 0%", color: "#c8f0ff", highlight: "#39ff14", label: "second line", explain: "This text appears on the very next line" },
          { text: "<hr>", color: "#ff9f43", highlight: "#ff9f43", label: "<hr>", explain: "Horizontal rule â€” draws a dividing line. Also no closing tag!" },
        ],
        miniChallenge: {
          id: "m4d", xp: 25,
          instruction: "Vent the plasma conduits! Write: Status: Critical â€” then a <br> â€” then: Send help",
          hint1: "Type your first line, then <br>, then your second line â€” no closing tag on br",
          hint2: "Status: Critical<br>Send help",
          hint3: "Status: Critical<br>Send help",
          walkthrough: ["Type: Status: Critical", "Add a line break: <br>", "Type: Send help", "Full answer: Status: Critical<br>Send help"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/status[:\s]*critical\s*<br\s*\/?>\s*send help/.test(n)) return "pass";
            if (!/<br/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss4", xp: 60,
      instruction: ["ðŸ›¸ Eject the warp core!", "Write a paragraph with ALERT in bold", "Add a line break then: ship damaged in italic", "Add an <hr> after the paragraph"],
      hint1: "You need <strong>, <br>, <em> inside a <p> tag, then <hr> after it",
      hint2: "<p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      hint3: "<p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      walkthrough: [
        "Open paragraph: <p>",
        "Add bold: <strong>ALERT</strong>",
        "Add line break: <br>",
        "Add italic: <em>ship damaged</em>",
        "Close paragraph: </p>",
        "Add divider: <hr>",
        "Full answer: <p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasStrong = /<strong>\s*alert\s*<\/strong>/.test(n);
        const hasBr = /<br\s*\/?>/.test(n);
        const hasEm = /<em>\s*ship damaged\s*<\/em>/.test(n);
        const hasHr = /<hr\s*\/?>/.test(n);
        if (hasStrong && hasBr && hasEm && hasHr) return "pass";
        if (!hasStrong) return "wrong_tag";
        if (!hasBr) return "wrong_tag";
        if (!hasEm) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 5,
    title: "Rebuild the Hull Structure",
    subtitle: "Page Structure",
    badge: "ðŸ—ï¸",
    badgeName: "Hull Core",
    shipPart: "HULL MODULE",
    storyIntro: "Text formatting restored! But your ship's hull structure is in pieces â€” sections are floating everywhere with no organization. Learn how to structure a webpage into proper sections so everything has its place.",
    theory: [
      {
        heading: "Initiate Structural Containment",
        body: "A <div> is like a plain cardboard box with no label on it. It has no special meaning â€” it just holds things together. You use it when you need to group a bunch of elements so you can move them around or style them together. Every <div> takes up the full width of the page, so whatever comes after it starts on a new line below.",
        anatomy: [
          { text: "<div>", color: "#00f5c4", highlight: "#00f5c4", label: "<div>", explain: "Opens a generic block container â€” div stands for division" },
          { text: "<h2>Section Title</h2> <p>Some content here.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content inside", explain: "Anything can go inside a div â€” headings, paragraphs, images, other divs" },
          { text: "</div>", color: "#00f5c4", highlight: "#00f5c4", label: "</div>", explain: "Closes THIS div â€” always close what you open!" },
        ],
        miniChallenge: {
          id: "m5a", xp: 20,
          instruction: "Initiate structural containment! Write a <div> that contains a paragraph that says: I am a section",
          hint1: "Open a <div>, put a <p> inside it, then close the </div>",
          hint2: "<div><p>â€¦</p></div>",
          hint3: "<div><p>I am a section</p></div>",
          walkthrough: ["Open: <div>", "Add a paragraph inside: <p>I am a section</p>", "Close the div: </div>", "Full answer: <div><p>I am a section</p></div>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<div>[\s\S]*<p>\s*i am a section\s*<\/p>[\s\S]*<\/div>/.test(n)) return "pass";
            if (!/<div/.test(n)) return "wrong_tag";
            if (/<div/.test(n) && !/<\/div>/.test(n)) return "no_close";
            if (!/<p/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Deploy the Inline Scanner",
        body: "A <span> is like using a highlighter on one specific word inside a sentence â€” without moving that word anywhere. While a <div> takes up the whole row and pushes everything else down, a <span> just wraps around a word or phrase right where it sits. Use it when you need to target something small inside a bigger block of text.",
        anatomy: [
          { text: "<p>My ship is ", color: "#c8f0ff", highlight: "#39ff14", label: "text before", explain: "Regular paragraph text" },
          { text: "<span>", color: "#ffe94d", highlight: "#ffe94d", label: "<span>", explain: "Opens an inline container â€” sits inside the text without breaking the line" },
          { text: "critically damaged", color: "#ff4d6d", highlight: "#ff4d6d", label: "targeted text", explain: "Just this phrase is wrapped â€” you could change its color or style later with CSS" },
          { text: "</span>", color: "#ffe94d", highlight: "#ffe94d", label: "</span>", explain: "Closes THIS span â€” the text continues on the same line after" },
          { text: ".</p>", color: "#c8f0ff", highlight: "#39ff14", label: "text after", explain: "The rest of the paragraph continues normally" },
        ],
        miniChallenge: {
          id: "m5b", xp: 20,
          instruction: "Deploy the inline scanner! Write a paragraph that says: The hull is â€” then wrap the word: damaged â€” in a <span>",
          hint1: "Put the <span> inside the <p> tag, wrapping just the word damaged",
          hint2: "<p>The hull is <span>â€¦</span></p>",
          hint3: "<p>The hull is <span>damaged</span></p>",
          walkthrough: ["Open: <p>", "Type: The hull is ", "Open span: <span>", "Type: damaged", "Close span: </span>", "Close p: </p>", "Full answer: <p>The hull is <span>damaged</span></p>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p>[\s\S]*the hull is\s*<span>\s*damaged\s*<\/span>[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!/<span/.test(n)) return "wrong_tag";
            if (/<span/.test(n) && !/<\/span>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Engage the Semantic Grid",
        body: "Semantic tags are like labeling the rooms of a house instead of calling them all just room. A <div> tells the browser nothing â€” it is a mystery box. But <header> says this is the top of the page, <nav> says these are the navigation links, <main> says this is the important stuff, and <footer> says this is the bottom. Google uses these labels to understand your page. Screen readers use them to help blind users jump directly to the content they need.",
        wireframe: true,
        anatomy: [
          { text: "<header>", color: "#ffe94d", highlight: "#ffe94d", label: "<header>", explain: "The top of the page â€” usually has the logo, title, and main navigation" },
          { text: "<nav>", color: "#00f5c4", highlight: "#00f5c4", label: "<nav>", explain: "Navigation â€” holds links to other pages or sections. Nav = navigation" },
          { text: "<main>", color: "#39ff14", highlight: "#39ff14", label: "<main>", explain: "The main content of the page â€” there should only be ONE main per page" },
          { text: "<footer>", color: "#a98dff", highlight: "#a98dff", label: "<footer>", explain: "The bottom of the page â€” usually has copyright info, contact links, legal stuff" },
        ],
        miniChallenge: {
          id: "m5c", xp: 25,
          instruction: "Engage the semantic grid! Write a <header> tag containing an h1 that says: My Website",
          hint1: "Put the <h1> inside the <header> tag",
          hint2: "<header><h1>â€¦</h1></header>",
          hint3: "<header><h1>My Website</h1></header>",
          walkthrough: ["Open: <header>", "Add heading inside: <h1>My Website</h1>", "Close: </header>", "Full answer: <header><h1>My Website</h1></header>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<header>[\s\S]*<h1>\s*my website\s*<\/h1>[\s\S]*<\/header>/.test(n)) return "pass";
            if (!/<header/.test(n)) return "wrong_tag";
            if (/<header/.test(n) && !/<\/header>/.test(n)) return "no_close";
            if (!/<h1/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Hull Layout Schematic",
        body: "Here is what a real webpage structure looks like. Think of it like a building â€” the header is the sign above the front door, the nav is the directory board in the lobby, the main is the actual room you came to visit, and the footer is the fine print at the bottom. Every professional website on the internet follows roughly this same layout:",
        codeBlock: `<header>\n  <h1>Signal Lost â€” Mission Control</h1>\n</header>\n\n<nav>\n  <a href="#mission">Mission</a>\n  <a href="#crew">Crew</a>\n</nav>\n\n<main>\n  <h2>Status Report</h2>\n  <p>Hull integrity at <span>12%</span>.</p>\n  <div>\n    <p>Engine offline.</p>\n    <p>Fuel depleted.</p>\n  </div>\n</main>\n\n<footer>\n  <p>Transmission sent from Sector 7</p>\n</footer>`,
        miniChallenge: {
          id: "m5d", xp: 25,
          instruction: "Full schematic check! Write a <main> tag containing a paragraph that says: This is the main content",
          hint1: "Put the <p> inside the <main> tag",
          hint2: "<main><p>â€¦</p></main>",
          hint3: "<main><p>This is the main content</p></main>",
          walkthrough: ["Open: <main>", "Add paragraph: <p>This is the main content</p>", "Close: </main>", "Full answer: <main><p>This is the main content</p></main>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<main>[\s\S]*<p>\s*this is the main content\s*<\/p>[\s\S]*<\/main>/.test(n)) return "pass";
            if (!/<main/.test(n)) return "wrong_tag";
            if (/<main/.test(n) && !/<\/main>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss5", xp: 60,
      instruction: ["ðŸ›¸ Seal the hull!", "Write a <header> with an h1 that says: My Page", "Write a <main> with a paragraph that says: Welcome aboard", "Write a <footer> with a paragraph that says: Made by me"],
      hint1: "Three semantic tags â€” header, main, footer â€” each containing content",
      hint2: "<header><h1>My Page</h1></header>  <main><p>Welcome aboard</p></main>  <footer><p>Made by me</p></footer>",
      hint3: "<header><h1>My Page</h1></header><main><p>Welcome aboard</p></main><footer><p>Made by me</p></footer>",
      walkthrough: [
        "Write: <header><h1>My Page</h1></header>",
        "Then: <main><p>Welcome aboard</p></main>",
        "Then: <footer><p>Made by me</p></footer>",
        "Full answer: <header><h1>My Page</h1></header><main><p>Welcome aboard</p></main><footer><p>Made by me</p></footer>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeader = /<header>[\s\S]*<h1>\s*my page\s*<\/h1>[\s\S]*<\/header>/.test(n);
        const hasMain = /<main>[\s\S]*<p>\s*welcome aboard\s*<\/p>[\s\S]*<\/main>/.test(n);
        const hasFooter = /<footer>[\s\S]*<p>\s*made by me\s*<\/p>[\s\S]*<\/footer>/.test(n);
        if (hasHeader && hasMain && hasFooter) return "pass";
        if (!hasHeader) return "wrong_tag";
        if (!hasMain) return "wrong_tag";
        if (!hasFooter) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 6,
    title: "Activate the Communication Array",
    subtitle: "Forms Part 1",
    badge: "ðŸ“»",
    badgeName: "Comms Core",
    shipPart: "COMMS MODULE",
    storyIntro: "Hull sealed! Your communication array is offline. Forms are how webpages collect information from users. Learn them to build your rescue request form.",
    theory: [
      {
        heading: "Charge the Subspace Transceiver",
        body: "Think of a <form> like a paper form at the doctor's office. The paper itself is not the information â€” it is just what holds all the fields together and gets handed in as one complete package. Without the form, your inputs are just random disconnected boxes floating on a page. Wrapping them in <form> tells the browser: these all belong together. When the user hits submit, the form collects every answer from every field inside it and sends them all at once.",
        anatomy: [
          { text: "<form>", color: "#00f5c4", highlight: "#00f5c4", label: "<form>", explain: "Opens the form container â€” everything inside is part of this form" },
          { text: "inputs go here", color: "#c8f0ff", highlight: "#39ff14", label: "inputs go here", explain: "Your input fields, labels, and buttons all go inside the form tags" },
          { text: "</form>", color: "#00f5c4", highlight: "#00f5c4", label: "</form>", explain: "Closes the form â€” always close what you open!" },
        ],
        miniChallenge: {
          id: "m6a", xp: 20,
          instruction: "Charge the transceiver! Write a <form> containing a paragraph that says: Rescue Request Form",
          hint1: "Put the <p> inside the <form> tags",
          hint2: "<form><p>...</p></form>",
          hint3: "<form><p>Rescue Request Form</p></form>",
          walkthrough: ["Open: <form>", "Add a paragraph: <p>Rescue Request Form</p>", "Close: </form>", "Full answer: <form><p>Rescue Request Form</p></form>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<form>[\s\S]*<p>\s*rescue request form\s*<\/p>[\s\S]*<\/form>/.test(n)) return "pass";
            if (!/<form/.test(n)) return "wrong_tag";
            if (/<form/.test(n) && !/<\/form>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Input Receivers",
        body: "An <input> is the blank line on a form where you write your answer. It is a void element â€” no closing tag needed because there is no content to wrap, it is just an empty field. The type attribute is crucial: type=\"text\" gives you a plain text box, type=\"email\" gives you one that checks for an @ sign, type=\"password\" hides what you type with dots. Always set the type so the browser knows what to expect.",
        anatomy: [
          { text: "<input ", color: "#00f5c4", highlight: "#00f5c4", label: "<input", explain: "Opens the input tag â€” no closing tag needed, it stands alone" },
          { text: 'type="text" ', color: "#ffe94d", highlight: "#ffe94d", label: 'type="text"', explain: "Sets what kind of input this is â€” text, email, password, number, etc." },
          { text: 'placeholder="Enter your name"', color: "#39ff14", highlight: "#39ff14", label: "placeholder", explain: "The grey hint text shown inside the field before the user types" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag â€” no </input> needed!" },
        ],
        miniChallenge: {
          id: "m6b", xp: 25,
          instruction: 'Calibrate the receiver! Write an input with type="text" and placeholder="Your name"',
          hint1: "Input tags stand alone â€” no closing tag needed",
          hint2: '<input type="text" placeholder="...">',
          hint3: '<input type="text" placeholder="Your name">',
          walkthrough: ['Start with: <input', 'Add type: type="text"', 'Add placeholder: placeholder="Your name"', 'Close it: >', 'Full answer: <input type="text" placeholder="Your name">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<input[^>]*type="text"[^>]*placeholder="your name"[^>]*>/.test(n) ||
                /<input[^>]*placeholder="your name"[^>]*type="text"[^>]*>/.test(n)) return "pass";
            if (!/<input/.test(n)) return "wrong_tag";
            if (!/type/.test(n)) return "no_src";
            if (!/placeholder/.test(n)) return "no_alt";
            return "generic";
          },
        },
      },
      {
        heading: "Link the Label Transmitters",
        body: "A <label> is the text printed next to a blank line on a form â€” like the little words that say Name: or Email: before each field. Without a label, a blind person using a screen reader has no idea what they are supposed to type into an input. You connect a label to its input by giving them matching values: for=\"name\" on the label and id=\"name\" on the input. They have to match exactly â€” like a lock and a key.",
        anatomy: [
          { text: "<label ", color: "#ffe94d", highlight: "#ffe94d", label: "<label", explain: "Opens the label tag" },
          { text: 'for="name"', color: "#39ff14", highlight: "#39ff14", label: 'for="name"', explain: "Links this label to the input with id='name' â€” they must match exactly" },
          { text: ">Your name:</label>", color: "#ffe94d", highlight: "#ffe94d", label: ">text</label>", explain: "The text users see next to the input field" },
          { text: "<input", color: "#00f5c4", highlight: "#00f5c4", label: "<input", explain: "The input this label is linked to" },
          { text: 'id="name"', color: "#39ff14", highlight: "#39ff14", label: 'id="name"', explain: "Must match the for= value on the label above" },
          { text: ' type="text">', color: "#00f5c4", highlight: "#00f5c4", label: 'type="text">', explain: "The rest of the input attributes" },
        ],
        miniChallenge: {
          id: "m6c", xp: 25,
          instruction: 'Link the transmitters! Write a label with for="email" that says: Email Address â€” then an input with id="email" and type="email"',
          hint1: "The label for= value must match the input id= value exactly",
          hint2: '<label for="email">Email Address</label> then <input id="email" type="email">',
          hint3: '<label for="email">Email Address</label><input id="email" type="email">',
          walkthrough: ['Write: <label for="email">Email Address</label>', 'Then: <input', 'Add id: id="email"', 'Add type: type="email"', 'Close: >', 'Full answer: <label for="email">Email Address</label><input id="email" type="email">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasLabel = /<label[^>]*for="email"[^>]*>\s*email address\s*<\/label>/.test(n);
            const hasInput = /<input[^>]*id="email"[^>]*type="email"[^>]*>/.test(n) || /<input[^>]*type="email"[^>]*id="email"[^>]*>/.test(n);
            if (hasLabel && hasInput) return "pass";
            if (!/<label/.test(n)) return "wrong_tag";
            if (!/<input/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Comms Array Schematic",
        body: "Here is what a real signup or contact form looks like under the hood. Every form you have ever filled out on the internet â€” login pages, checkout forms, survey forms â€” is built with exactly these pieces:",
        codeBlock: `<form>\n  <label for="name">Your Name:</label>\n  <input id="name" type="text" placeholder="Enter your name">\n\n  <label for="email">Your Email:</label>\n  <input id="email" type="email" placeholder="Enter your email">\n\n  <button type="submit">Send Rescue Request</button>\n</form>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss6", xp: 60,
      instruction: ["ðŸ›¸ Activate the comms array!", 'Write a <form> containing a label with for="username" that says: Username', 'Then an input with id="username" and type="text"', "Then a <button> that says: Submit"],
      hint1: "Four things â€” form wrapping a label, input, and button",
      hint2: '<form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      hint3: '<form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      walkthrough: [
        "Open the form: <form>",
        'Add the label: <label for="username">Username</label>',
        'Add the input: <input id="username" type="text">',
        "Add the button: <button>Submit</button>",
        "Close the form: </form>",
        'Full answer: <form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasForm = /<form>[\s\S]*<\/form>/.test(n);
        const hasLabel = /<label[^>]*for="username"[^>]*>\s*username\s*<\/label>/.test(n);
        const hasInput = /<input[^>]*id="username"[^>]*type="text"[^>]*>/.test(n) || /<input[^>]*type="text"[^>]*id="username"[^>]*>/.test(n);
        const hasButton = /<button[^>]*>\s*submit\s*<\/button>/.test(n);
        if (hasForm && hasLabel && hasInput && hasButton) return "pass";
        if (!hasForm) return "wrong_tag";
        if (!hasLabel) return "wrong_tag";
        if (!hasInput) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },

  ,
  {
    id: 7,
    title: "Upgrade the Life Pod Controls",
    subtitle: "Forms Part 2",
    badge: "ðŸŽ›ï¸",
    badgeName: "Controls Core",
    shipPart: "CONTROLS MODULE",
    storyIntro: "Comms array online! Your life pod control panel needs more advanced inputs â€” dropdowns, multi-line text fields, and a proper submit button so survivors can send detailed rescue requests.",
    theory: [
      {
        heading: "Install the Dropdown Selector",
        body: "A <select> is a multiple choice question â€” the user can only pick one answer from a predefined list. Think of it like one of those little spinning wheels on a form where you pick your birth year. Each choice is an <option> tag inside the <select>. The text inside the option is what the user sees. You can also add a value attribute â€” that is the behind-the-scenes code that gets sent when the form submits, which can be different from what the user sees.",
        anatomy: [
          { text: "<select>", color: "#00f5c4", highlight: "#00f5c4", label: "<select>", explain: "Opens the dropdown menu" },
          { text: "<option", color: "#ffe94d", highlight: "#ffe94d", label: "<option", explain: "Each choice gets its own option tag" },
          { text: 'value="mars"', color: "#39ff14", highlight: "#39ff14", label: 'value="mars"', explain: "The value sent when selected â€” not shown to the user" },
          { text: ">Mars</option>", color: "#ffe94d", highlight: "#ffe94d", label: ">text</option>", explain: "The text the user actually sees" },
          { text: "</select>", color: "#00f5c4", highlight: "#00f5c4", label: "</select>", explain: "Closes the dropdown" },
        ],
        miniChallenge: {
          id: "m7a", xp: 25,
          instruction: "Install the selector! Write a <select> with two options: Earth and Mars",
          hint1: "Put two <option> tags inside a <select> tag",
          hint2: "<select><option>Earth</option><option>Mars</option></select>",
          hint3: "<select><option>Earth</option><option>Mars</option></select>",
          walkthrough: ["Open: <select>", "Add: <option>Earth</option>", "Add: <option>Mars</option>", "Close: </select>", "Full answer: <select><option>Earth</option><option>Mars</option></select>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<select>[\s\S]*<option[^>]*>[\s\S]*earth[\s\S]*<\/option>[\s\S]*<option[^>]*>[\s\S]*mars[\s\S]*<\/option>[\s\S]*<\/select>/.test(n)) return "pass";
            if (!/<select/.test(n)) return "wrong_tag";
            if (!/<option/.test(n)) return "no_li";
            if (/<select/.test(n) && !/<\/select>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Message Decoder",
        body: "A <textarea> is the big empty box on a form that says Additional Comments â€” you can type as much as you want and it grows as you type. Unlike a regular <input> which is just one line, a textarea gives you room to write a whole paragraph. It needs a closing tag because you can put default text between the tags if you want something to appear in the box before the user types.",
        anatomy: [
          { text: "<textarea ", color: "#00f5c4", highlight: "#00f5c4", label: "<textarea", explain: "Opens the multi-line text input" },
          { text: 'placeholder="Describe your situation"', color: "#39ff14", highlight: "#39ff14", label: "placeholder", explain: "Hint text shown before the user types" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag" },
          { text: "</textarea>", color: "#00f5c4", highlight: "#00f5c4", label: "</textarea>", explain: "Closes the textarea â€” unlike input, this needs a closing tag!" },
        ],
        miniChallenge: {
          id: "m7b", xp: 25,
          instruction: 'Activate the decoder! Write a <textarea> with placeholder="Describe your emergency"',
          hint1: "Unlike input, textarea has a closing tag",
          hint2: '<textarea placeholder="..."></textarea>',
          hint3: '<textarea placeholder="Describe your emergency"></textarea>',
          walkthrough: ['Open: <textarea', 'Add placeholder: placeholder="Describe your emergency"', 'Close opening tag: >', 'Add closing tag: </textarea>', 'Full answer: <textarea placeholder="Describe your emergency"></textarea>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<textarea[^>]*placeholder="describe your emergency"[^>]*>[\s\S]*<\/textarea>/.test(n)) return "pass";
            if (!/<textarea/.test(n)) return "wrong_tag";
            if (/<textarea/.test(n) && !/<\/textarea>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Arm the Launch Sequence",
        body: "A submit button is the SEND button on a text message â€” nothing goes anywhere until you press it. Without it, all the data just sits in the form doing nothing. Add type=\"submit\" to a button inside a form and clicking it instantly collects everything the user typed and sends it. If you leave out the type=\"submit\" part, it is just a regular button that does nothing when clicked.",
        anatomy: [
          { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "Opens the button tag" },
          { text: 'type="submit"', color: "#ffe94d", highlight: "#ffe94d", label: 'type="submit"', explain: "Makes this button submit the whole form when clicked" },
          { text: ">Send Rescue Request</button>", color: "#c8f0ff", highlight: "#39ff14", label: ">text</button>", explain: "The text on the button" },
        ],
        miniChallenge: {
          id: "m7c", xp: 20,
          instruction: 'Arm the launch sequence! Write a button with type="submit" that says: Launch Rescue',
          hint1: 'Add type="submit" inside the opening button tag',
          hint2: '<button type="submit">...</button>',
          hint3: '<button type="submit">Launch Rescue</button>',
          walkthrough: ['Open: <button', 'Add: type="submit"', 'Close: >', 'Add text: Launch Rescue', 'Close: </button>', 'Full answer: <button type="submit">Launch Rescue</button>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<button[^>]*type="submit"[^>]*>\s*launch rescue\s*<\/button>/.test(n)) return "pass";
            if (!/<button/.test(n)) return "wrong_tag";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Full Control Panel Schematic",
        body: "Put it all together and here is what a real contact or survey form looks like â€” the kind you see on every website when someone asks for feedback or wants you to fill out a questionnaire:",
        codeBlock: `<form>\n  <label for="planet">Destination:</label>\n  <select id="planet">\n    <option>Earth</option>\n    <option>Mars</option>\n  </select>\n\n  <label for="msg">Your Message:</label>\n  <textarea id="msg" placeholder="Describe your situation"></textarea>\n\n  <button type="submit">Send Rescue Request</button>\n</form>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss7", xp: 60,
      instruction: ["ðŸ›¸ Engage the life pod controls!", "Write a <select> with two options: Yes and No", 'Write a <textarea> with placeholder: Tell us more', 'Write a <button type="submit"> that says: Send'],
      hint1: "Three tags â€” select with options, textarea, then submit button",
      hint2: '<select><option>Yes</option><option>No</option></select><textarea placeholder="Tell us more"></textarea><button type="submit">Send</button>',
      hint3: '<select><option>Yes</option><option>No</option></select><textarea placeholder="Tell us more"></textarea><button type="submit">Send</button>',
      walkthrough: [
        "Write the dropdown: <select><option>Yes</option><option>No</option></select>",
        'Write the textarea: <textarea placeholder="Tell us more"></textarea>',
        'Write the button: <button type="submit">Send</button>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasSelect = /<select>[\s\S]*<option[^>]*>[\s\S]*yes[\s\S]*<\/option>[\s\S]*<option[^>]*>[\s\S]*no[\s\S]*<\/option>[\s\S]*<\/select>/.test(n);
        const hasTextarea = /<textarea[^>]*placeholder="tell us more"[^>]*>[\s\S]*<\/textarea>/.test(n);
        const hasButton = /<button[^>]*type="submit"[^>]*>\s*send\s*<\/button>/.test(n);
        if (hasSelect && hasTextarea && hasButton) return "pass";
        if (!hasSelect) return "wrong_tag";
        if (!hasTextarea) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 8,
    title: "Reconstruct the Data Matrix",
    subtitle: "Tables",
    badge: "ðŸ“Š",
    badgeName: "Matrix Core",
    shipPart: "MATRIX MODULE",
    storyIntro: "Life pod ready! Your ship data is raw numbers with no structure. Tables organize data into rows and columns â€” exactly what you need for your crew manifest.",
    theory: [
      {
        heading: "Initialize the Data Grid",
        body: "A table is like a spreadsheet â€” rows going left to right, columns going top to bottom. The whole thing is wrapped in <table>. Each row is a <tr> â€” think of it as one horizontal strip across the table. Inside each row, each individual box of data is a <td>. So the pattern is always: table on the outside, tr for each row, td for each cell inside that row.",
        anatomy: [
          { text: "<table>", color: "#00f5c4", highlight: "#00f5c4", label: "<table>", explain: "Opens the table â€” wraps the entire grid" },
          { text: "<tr>", color: "#ffe94d", highlight: "#ffe94d", label: "<tr>", explain: "Opens a row â€” tr stands for table row" },
          { text: "<td>Cell 1</td>", color: "#39ff14", highlight: "#39ff14", label: "<td>", explain: "A single cell â€” td stands for table data" },
          { text: "<td>Cell 2</td>", color: "#39ff14", highlight: "#39ff14", label: "<td>", explain: "Another cell in the same row" },
          { text: "</tr>", color: "#ffe94d", highlight: "#ffe94d", label: "</tr>", explain: "Closes THIS row" },
          { text: "</table>", color: "#00f5c4", highlight: "#00f5c4", label: "</table>", explain: "Closes the whole table" },
        ],
        miniChallenge: {
          id: "m8a", xp: 25,
          instruction: "Initialize the grid! Write a <table> with one <tr> containing two <td> cells: Name and Age",
          hint1: "table wraps tr, tr wraps td cells",
          hint2: "<table><tr><td>Name</td><td>Age</td></tr></table>",
          hint3: "<table><tr><td>Name</td><td>Age</td></tr></table>",
          walkthrough: ["Open: <table>", "Open a row: <tr>", "Add cell 1: <td>Name</td>", "Add cell 2: <td>Age</td>", "Close row: </tr>", "Close table: </table>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<table>[\s\S]*<tr>[\s\S]*<td>[\s\S]*name[\s\S]*<\/td>[\s\S]*<td>[\s\S]*age[\s\S]*<\/td>[\s\S]*<\/tr>[\s\S]*<\/table>/.test(n)) return "pass";
            if (!/<table/.test(n)) return "wrong_tag";
            if (!/<tr/.test(n)) return "no_li";
            if (!/<td/.test(n)) return "no_li";
            if (/<table/.test(n) && !/<\/table>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Upload the Column Headers",
        body: "Every spreadsheet has that bold grey row at the very top that labels each column â€” Name, Age, Status, whatever. In HTML that is a <th> instead of a <td>. Th stands for table header. The browser automatically makes it bold and centered so it stands out from the regular data. Everything else works exactly the same as a regular row â€” it is still inside a <tr>, you just swap <td> for <th>.",
        anatomy: [
          { text: "<tr>", color: "#ffe94d", highlight: "#ffe94d", label: "<tr>", explain: "Opens the header row" },
          { text: "<th>Name</th>", color: "#ff9f43", highlight: "#ff9f43", label: "<th>", explain: "Header cell â€” automatically bold and centered. Th = table header" },
          { text: "<th>Status</th>", color: "#ff9f43", highlight: "#ff9f43", label: "<th>", explain: "Another header cell for the next column" },
          { text: "</tr>", color: "#ffe94d", highlight: "#ffe94d", label: "</tr>", explain: "Closes the header row" },
        ],
        miniChallenge: {
          id: "m8b", xp: 25,
          instruction: "Upload the headers! Write a <tr> containing two <th> cells: Planet and Status",
          hint1: "th is just like td but for headers â€” bold and centered automatically",
          hint2: "<tr><th>Planet</th><th>Status</th></tr>",
          hint3: "<tr><th>Planet</th><th>Status</th></tr>",
          walkthrough: ["Open a row: <tr>", "Add header 1: <th>Planet</th>", "Add header 2: <th>Status</th>", "Close: </tr>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<tr>[\s\S]*<th>[\s\S]*planet[\s\S]*<\/th>[\s\S]*<th>[\s\S]*status[\s\S]*<\/th>[\s\S]*<\/tr>/.test(n)) return "pass";
            if (!/<tr/.test(n)) return "wrong_tag";
            if (!/<th/.test(n)) return "no_li";
            if (/<tr/.test(n) && !/<\/tr>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Run Full Matrix Diagnostics",
        body: "Here is what a real data table looks like â€” the kind you would see on a sports stats page, a pricing comparison, or a flight schedule. Headers across the top, rows of data below:",
        codeBlock: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Planet</th>\n    <th>Status</th>\n  </tr>\n  <tr>\n    <td>Commander Zyx</td>\n    <td>Kepler-22b</td>\n    <td>MIA</td>\n  </tr>\n  <tr>\n    <td>Engineer Blorp</td>\n    <td>Mars</td>\n    <td>Active</td>\n  </tr>\n</table>`,
        miniChallenge: {
          id: "m8c", xp: 25,
          instruction: "Run diagnostics! Write a table with headers: Crew and Role â€” then one data row: Zyx and Pilot",
          hint1: "You need th for headers and td for data, all inside tr rows inside table",
          hint2: "<table><tr><th>Crew</th><th>Role</th></tr><tr><td>Zyx</td><td>Pilot</td></tr></table>",
          hint3: "<table><tr><th>Crew</th><th>Role</th></tr><tr><td>Zyx</td><td>Pilot</td></tr></table>",
          walkthrough: ["Open: <table>", "Header row: <tr><th>Crew</th><th>Role</th></tr>", "Data row: <tr><td>Zyx</td><td>Pilot</td></tr>", "Close: </table>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasHeaders = /<th>[\s\S]*crew[\s\S]*<\/th>[\s\S]*<th>[\s\S]*role[\s\S]*<\/th>/.test(n);
            const hasData = /<td>[\s\S]*zyx[\s\S]*<\/td>[\s\S]*<td>[\s\S]*pilot[\s\S]*<\/td>/.test(n);
            const hasTable = /<table>[\s\S]*<\/table>/.test(n);
            if (hasTable && hasHeaders && hasData) return "pass";
            if (!/<table/.test(n)) return "wrong_tag";
            if (!/<th/.test(n)) return "no_li";
            if (!/<td/.test(n)) return "no_li";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss8", xp: 60,
      instruction: ["ðŸ›¸ Reconstruct the data matrix!", "Write a table with headers: Item and Count", "Add two data rows: Oxygen Tanks / 3 and Escape Pods / 1"],
      hint1: "table with two th headers and two tr data rows each with two td cells",
      hint2: "<table><tr><th>Item</th><th>Count</th></tr><tr><td>Oxygen Tanks</td><td>3</td></tr><tr><td>Escape Pods</td><td>1</td></tr></table>",
      hint3: "<table><tr><th>Item</th><th>Count</th></tr><tr><td>Oxygen Tanks</td><td>3</td></tr><tr><td>Escape Pods</td><td>1</td></tr></table>",
      walkthrough: [
        "Open: <table>",
        "Header row: <tr><th>Item</th><th>Count</th></tr>",
        "Data row 1: <tr><td>Oxygen Tanks</td><td>3</td></tr>",
        "Data row 2: <tr><td>Escape Pods</td><td>1</td></tr>",
        "Close: </table>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeaders = /<th>[\s\S]*item[\s\S]*<\/th>[\s\S]*<th>[\s\S]*count[\s\S]*<\/th>/.test(n);
        const hasRow1 = /<td>[\s\S]*oxygen tanks[\s\S]*<\/td>[\s\S]*<td>[\s\S]*3[\s\S]*<\/td>/.test(n);
        const hasRow2 = /<td>[\s\S]*escape pods[\s\S]*<\/td>[\s\S]*<td>[\s\S]*1[\s\S]*<\/td>/.test(n);
        const hasTable = /<table>[\s\S]*<\/table>/.test(n);
        if (hasTable && hasHeaders && hasRow1 && hasRow2) return "pass";
        if (!/<table/.test(n)) return "wrong_tag";
        if (!/<th/.test(n)) return "no_li";
        return "generic";
      },
    },
  },

  ,
  {
    id: 9,
    title: "Decode the Alien Broadcast",
    subtitle: "Semantic HTML",
    badge: "ðŸ“°",
    badgeName: "Broadcast Core",
    shipPart: "BROADCAST MODULE",
    storyIntro: "Data matrix online! Alien broadcasts are coming in but they have no structure â€” just a wall of content with no labels. Semantic HTML tags tell the browser exactly what each piece of content IS, so it can be organized, searched, and understood by anyone.",
    theory: [
      {
        heading: "Intercept the Article Signal",
        body: "An <article> is a self-contained piece of content that makes sense on its own â€” like a blog post, a news story, or a product review. If you could copy it to another website and it would still make sense by itself, it is probably an article. Think of it like a newspaper clipping â€” the story works whether it is in the paper or pinned to your fridge.",
        anatomy: [
          { text: "<article>", color: "#00f5c4", highlight: "#00f5c4", label: "<article>", explain: "Opens a self-contained piece of content â€” like one blog post or news story" },
          { text: "<h2>Breaking News</h2> <p>Ship located in Sector 7.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The full content of the article â€” heading, paragraphs, images, whatever it needs" },
          { text: "</article>", color: "#00f5c4", highlight: "#00f5c4", label: "</article>", explain: "Closes THIS article â€” everything inside stands alone as one complete piece" },
        ],
        miniChallenge: {
          id: "m9a", xp: 20,
          instruction: "Intercept the signal! Write an <article> containing an h2 that says: Breaking News and a paragraph that says: Ship found",
          hint1: "Put both the h2 and p inside the article tags",
          hint2: "<article><h2>Breaking News</h2><p>Ship found</p></article>",
          hint3: "<article><h2>Breaking News</h2><p>Ship found</p></article>",
          walkthrough: ["Open: <article>", "Add heading: <h2>Breaking News</h2>", "Add paragraph: <p>Ship found</p>", "Close: </article>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<article>[\s\S]*<h2>[\s\S]*breaking news[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*ship found[\s\S]*<\/p>[\s\S]*<\/article>/.test(n)) return "pass";
            if (!/<article/.test(n)) return "wrong_tag";
            if (/<article/.test(n) && !/<\/article>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Triangulate the Section Beam",
        body: "A <section> is a themed chunk of a page â€” like a chapter in a book. While an article is a complete standalone piece, a section is just one part of something bigger. Think of your webpage like a house â€” the whole house is the page, each room is a section. The living room is one section, the kitchen is another. Neither makes sense ripped out of the house, but together they make up the whole thing.",
        anatomy: [
          { text: "<section>", color: "#ffe94d", highlight: "#ffe94d", label: "<section>", explain: "Opens a themed chunk of the page â€” one room in the house" },
          { text: "<h2>Our Mission</h2> <p>We explore the galaxy.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Everything that belongs to this section of the page" },
          { text: "</section>", color: "#ffe94d", highlight: "#ffe94d", label: "</section>", explain: "Closes THIS section â€” the next section starts fresh" },
        ],
        miniChallenge: {
          id: "m9b", xp: 20,
          instruction: "Triangulate the beam! Write a <section> containing an h2 that says: Our Crew and a paragraph that says: We are a team of explorers",
          hint1: "Put both tags inside the section tags",
          hint2: "<section><h2>Our Crew</h2><p>We are a team of explorers</p></section>",
          hint3: "<section><h2>Our Crew</h2><p>We are a team of explorers</p></section>",
          walkthrough: ["Open: <section>", "Add heading: <h2>Our Crew</h2>", "Add paragraph: <p>We are a team of explorers</p>", "Close: </section>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<section>[\s\S]*<h2>[\s\S]*our crew[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*we are a team of explorers[\s\S]*<\/p>[\s\S]*<\/section>/.test(n)) return "pass";
            if (!/<section/.test(n)) return "wrong_tag";
            if (/<section/.test(n) && !/<\/section>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Scan the Peripheral Data Stream",
        body: "An <aside> is content that sits alongside the main content but is not essential to it â€” like a sidebar on a news website with related articles, or a fun fact box in a textbook. If you removed it, the main content would still make complete sense. Think of it like the margin notes you write in a book â€” interesting, relevant, but not the main story.",
        anatomy: [
          { text: "<aside>", color: "#a98dff", highlight: "#a98dff", label: "<aside>", explain: "Opens side content â€” related but not essential to the main story" },
          { text: "<p>Did you know: Sector 7 has 3 moons.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "A fun fact, related link, or extra info that supports but does not replace the main content" },
          { text: "</aside>", color: "#a98dff", highlight: "#a98dff", label: "</aside>", explain: "Closes THIS aside" },
        ],
        miniChallenge: {
          id: "m9c", xp: 20,
          instruction: "Scan the data stream! Write an <aside> containing a paragraph that says: Fun fact: HTML was invented in 1991",
          hint1: "Just like a div but labeled as side content",
          hint2: "<aside><p>Fun fact: HTML was invented in 1991</p></aside>",
          hint3: "<aside><p>Fun fact: HTML was invented in 1991</p></aside>",
          walkthrough: ["Open: <aside>", "Add paragraph: <p>Fun fact: HTML was invented in 1991</p>", "Close: </aside>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<aside>[\s\S]*<p>[\s\S]*fun fact[\s\S]*html[\s\S]*1991[\s\S]*<\/p>[\s\S]*<\/aside>/.test(n)) return "pass";
            if (!/<aside/.test(n)) return "wrong_tag";
            if (/<aside/.test(n) && !/<\/aside>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Visual Sensors",
        body: "A <figure> wraps an image together with its caption. The caption goes inside a <figcaption> tag. Think of it like a framed photo on the wall â€” the frame holds both the photo AND the little label underneath that says what it is. Before figure existed, images and their captions were just floating separately with no connection between them.",
        anatomy: [
          { text: "<figure>", color: "#39ff14", highlight: "#39ff14", label: "<figure>", explain: "Wraps an image and its caption together as one unit" },
          { text: "<img src=\"ship.jpg\" alt=\"crashed ship\">\n  ", color: "#00f5c4", highlight: "#00f5c4", label: "<img>", explain: "The image itself â€” same as always" },
          { text: "<figcaption>", color: "#ff9f43", highlight: "#ff9f43", label: "<figcaption>", explain: "Opens the caption â€” the descriptive text shown under the image" },
          { text: "Crash site</figcaption>", color: "#c8f0ff", highlight: "#39ff14", label: "caption text", explain: "What the caption actually says" },
          { text: "</figure>", color: "#39ff14", highlight: "#39ff14", label: "</figure>", explain: "Closes the figure â€” image and caption are now one packaged unit" },
        ],
        miniChallenge: {
          id: "m9d", xp: 25,
          instruction: 'Calibrate the sensors! Write a <figure> containing an img with src="alien.jpg" and alt="alien" plus a <figcaption> that says: An alien spotted on Earth',
          hint1: "figure wraps both the img and the figcaption together",
          hint2: '<figure><img src="alien.jpg" alt="alien"><figcaption>An alien spotted on Earth</figcaption></figure>',
          hint3: '<figure><img src="alien.jpg" alt="alien"><figcaption>An alien spotted on Earth</figcaption></figure>',
          walkthrough: ['Open: <figure>', 'Add image: <img src="alien.jpg" alt="alien">', 'Add caption: <figcaption>An alien spotted on Earth</figcaption>', 'Close: </figure>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasFigure = /<figure>[\s\S]*<\/figure>/.test(n);
            const hasImg = /<img[^>]*src="alien\.jpg"[^>]*alt="alien"[^>]*>/.test(n) || /<img[^>]*alt="alien"[^>]*src="alien\.jpg"[^>]*>/.test(n);
            const hasCaption = /<figcaption>[\s\S]*an alien spotted on earth[\s\S]*<\/figcaption>/.test(n);
            if (hasFigure && hasImg && hasCaption) return "pass";
            if (!/<figure/.test(n)) return "wrong_tag";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!/<figcaption/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss9", xp: 70,
      instruction: ["ðŸ›¸ Decode the full broadcast!", "Write an <article> containing an h2 that says: Mission Report", "Inside the article add a <section> with a paragraph that says: All systems nominal", "After the section add an <aside> with a paragraph that says: Sector 7 is 4 light years away"],
      hint1: "article wraps everything â€” section and aside both go inside the article",
      hint2: "<article><h2>Mission Report</h2><section><p>All systems nominal</p></section><aside><p>Sector 7 is 4 light years away</p></aside></article>",
      hint3: "<article><h2>Mission Report</h2><section><p>All systems nominal</p></section><aside><p>Sector 7 is 4 light years away</p></aside></article>",
      walkthrough: [
        "Open the article: <article>",
        "Add the heading: <h2>Mission Report</h2>",
        "Add the section: <section><p>All systems nominal</p></section>",
        "Add the aside: <aside><p>Sector 7 is 4 light years away</p></aside>",
        "Close the article: </article>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasArticle = /<article>[\s\S]*<\/article>/.test(n);
        const hasH2 = /<h2>[\s\S]*mission report[\s\S]*<\/h2>/.test(n);
        const hasSection = /<section>[\s\S]*all systems nominal[\s\S]*<\/section>/.test(n);
        const hasAside = /<aside>[\s\S]*sector 7 is 4 light years away[\s\S]*<\/aside>/.test(n);
        if (hasArticle && hasH2 && hasSection && hasAside) return "pass";
        if (!hasArticle) return "wrong_tag";
        if (!hasH2) return "wrong_text";
        if (!hasSection) return "wrong_tag";
        if (!hasAside) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 10,
    title: "Restore the Holographic Projector",
    subtitle: "Media",
    badge: "ðŸ“º",
    badgeName: "Projector Core",
    shipPart: "PROJECTOR MODULE",
    storyIntro: "Broadcast decoded! Your holographic projector is offline â€” you can not play any video or audio transmissions from home. Learn how to embed media so your distress signal can include a video message to Earth.",
    theory: [
      {
        heading: "Boot the Video Transmitter",
        body: "The <video> tag embeds a video directly on your page. The src attribute points to your video file and controls adds the play, pause, and volume buttons â€” without controls the video just sits there with nothing to click. Other useful attributes you'll use regularly: autoplay starts the video automatically, loop replays it when it ends, muted starts it silent (browsers actually REQUIRE muted for autoplay to work â€” they block audio autoplay to stop pages from blasting noise at you), and poster sets a thumbnail image shown before the video plays. Is this everything? Almost â€” when you get to JavaScript you'll learn to build custom video players with your own buttons and controls. But for 90% of real projects, what you're learning right now is all you need.",
        anatomy: [
          { text: "<video ", color: "#00f5c4", highlight: "#00f5c4", label: "<video", explain: "Opens the video player tag" },
          { text: 'src="rescue.mp4" ', color: "#ffe94d", highlight: "#ffe94d", label: 'src="rescue.mp4"', explain: "The address of the video file â€” just like src on an image" },
          { text: "controls", color: "#39ff14", highlight: "#39ff14", label: "controls", explain: "Adds play, pause, and volume buttons â€” without this the user cannot control the video" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag" },
          { text: "</video>", color: "#00f5c4", highlight: "#00f5c4", label: "</video>", explain: "Closes the video tag â€” unlike img, video needs a closing tag" },
        ],
        miniChallenge: {
          id: "m10a", xp: 25,
          instruction: 'Boot the transmitter! Write a <video> tag with src="message.mp4" and the controls attribute',
          hint1: "controls is just a word on its own â€” no = or quotes needed",
          hint2: '<video src="message.mp4" controls></video>',
          hint3: '<video src="message.mp4" controls></video>',
          walkthrough: ['Open: <video', 'Add src: src="message.mp4"', 'Add controls: controls', 'Close opening tag: >', 'Add closing tag: </video>', 'Full answer: <video src="message.mp4" controls></video>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<video[^>]*src="message\.mp4"[^>]*controls[^>]*>[\s\S]*<\/video>/.test(n) ||
                /<video[^>]*controls[^>]*src="message\.mp4"[^>]*>[\s\S]*<\/video>/.test(n)) return "pass";
            if (!/<video/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (!(/controls/.test(n))) return "no_alt";
            if (/<video/.test(n) && !/<\/video>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Audio Receiver",
        body: "The <audio> tag works exactly like <video> but for sound only â€” no picture, just audio. Same attributes: src for the file, controls for the playback buttons, autoplay, loop, muted. Everything you just learned about video applies here too. Will you need more than this? Eventually yes â€” JavaScript lets you trigger sounds on button clicks, sync audio with animations, and build full custom music players. But the <audio> tag itself is complete as-is for embedding podcasts, sound effects, and music players on any page.",
        anatomy: [
          { text: "<audio ", color: "#ffe94d", highlight: "#ffe94d", label: "<audio", explain: "Opens the audio player tag â€” works just like video but for sound" },
          { text: 'src="signal.mp3" ', color: "#39ff14", highlight: "#39ff14", label: 'src="signal.mp3"', explain: "The address of the audio file" },
          { text: "controls", color: "#00f5c4", highlight: "#00f5c4", label: "controls", explain: "Adds play, pause, and volume â€” same as on video" },
          { text: "></audio>", color: "#ffe94d", highlight: "#ffe94d", label: "></audio>", explain: "Close opening tag and add closing tag" },
        ],
        miniChallenge: {
          id: "m10b", xp: 25,
          instruction: 'Activate the receiver! Write an <audio> tag with src="distress.mp3" and controls',
          hint1: "Same as video but swap the tag name to audio",
          hint2: '<audio src="distress.mp3" controls></audio>',
          hint3: '<audio src="distress.mp3" controls></audio>',
          walkthrough: ['Open: <audio', 'Add src: src="distress.mp3"', 'Add controls', 'Close: ></audio>', 'Full answer: <audio src="distress.mp3" controls></audio>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<audio[^>]*src="distress\.mp3"[^>]*controls[^>]*>[\s\S]*<\/audio>/.test(n) ||
                /<audio[^>]*controls[^>]*src="distress\.mp3"[^>]*>[\s\S]*<\/audio>/.test(n)) return "pass";
            if (!/<audio/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (!(/controls/.test(n))) return "no_alt";
            if (/<audio/.test(n) && !/<\/audio>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Open the Wormhole Window",
        body: "An <iframe> is a window inside your webpage that shows an entirely different webpage inside it â€” like a TV inside your TV. This is exactly how YouTube videos appear on news sites and blogs, and how Google Maps gets embedded on restaurant websites. The src is the URL of what you want to show. Width and height control the size â€” and they can be written in any order since attribute order never matters in HTML. Some common sizes to know: YouTube embeds use width='560' height='315', Google Maps uses width='600' height='450', and width='100%' height='400' works well on mobile. One thing to know: not every website allows itself to be embedded â€” many block it for security reasons. YouTube, Google Maps, and most services that provide embed codes are specifically designed to be embedded.",
        anatomy: [
          { text: "<iframe ", color: "#a98dff", highlight: "#a98dff", label: "<iframe", explain: "Opens an embedded window â€” iframe stands for inline frame" },
          { text: 'src="https://youtube.com/embed/abc"', color: "#39ff14", highlight: "#39ff14", label: 'src="..."', explain: "The address of the page to show inside the window" },
          { text: " width=\"560\" height=\"315\"", color: "#ffe94d", highlight: "#ffe94d", label: "width & height", explain: "How big the window is in pixels â€” you control the size" },
          { text: "></iframe>", color: "#a98dff", highlight: "#a98dff", label: "></iframe>", explain: "Closes the iframe â€” always needs a closing tag" },
        ],
        miniChallenge: {
          id: "m10c", xp: 25,
          instruction: 'Open the wormhole! Write an <iframe> with src="https://example.com" and width="400" and height="300"',
          hint1: "iframe needs a src, width, height, and a closing tag",
          hint2: '<iframe src="https://example.com" width="400" height="300"></iframe>',
          hint3: '<iframe src="https://example.com" width="400" height="300"></iframe>',
          walkthrough: ['Open: <iframe', 'Add src: src="https://example.com"', 'Add width: width="400"', 'Add height: height="300"', 'Close: ></iframe>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<iframe[^>]*src="https:\/\/example\.com"[^>]*width="400"[^>]*height="300"[^>]*>[\s\S]*<\/iframe>/.test(n) ||
                /<iframe[^>]*src="https:\/\/example\.com"[^>]*>[\s\S]*<\/iframe>/.test(n) && /width="400"/.test(n) && /height="300"/.test(n)) return "pass";
            if (!/<iframe/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (/<iframe/.test(n) && !/<\/iframe>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Full Projector System Online",
        body: "Here is what a complete media page looks like with all three tags working together. Notice how simple the HTML actually is â€” three tags, each doing one job. The browser handles all the complexity of the actual players. When you get to CSS you'll learn how to style these players, resize them responsively, and position them exactly where you want on the page:",
        codeBlock: `<h1>Mission Transmissions</h1>\n\n<h2>Video Message</h2>\n<video src="message.mp4" controls></video>\n\n<h2>Audio Log</h2>\n<audio src="log.mp3" controls></audio>\n\n<h2>Live Feed</h2>\n<iframe\n  src="https://example.com/feed"\n  width="560"\n  height="315">\n</iframe>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss10", xp: 70,
      instruction: ["ðŸ›¸ Restore the holographic projector!", 'Write a <video> with src="clip.mp4" and controls', 'Write an <audio> with src="sound.mp3" and controls', 'Write an <iframe> with src="https://example.com" width="560" and height="315"'],
      hint1: "Three separate media tags one after another â€” video, audio, then iframe",
      hint2: '<video src="clip.mp4" controls></video>  <audio src="sound.mp3" controls></audio>  <iframe src="https://example.com" width="560" height="315"></iframe>',
      hint3: '<video src="clip.mp4" controls></video><audio src="sound.mp3" controls></audio><iframe src="https://example.com" width="560" height="315"></iframe>',
      walkthrough: [
        'Write the video: <video src="clip.mp4" controls></video>',
        'Write the audio: <audio src="sound.mp3" controls></audio>',
        'Write the iframe: <iframe src="https://example.com" width="560" height="315"></iframe>',
        "Put all three one after another",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasVideo = /<video[^>]*src="clip\.mp4"[^>]*controls[^>]*>[\s\S]*<\/video>/.test(n) || /<video[^>]*controls[^>]*src="clip\.mp4"[^>]*>[\s\S]*<\/video>/.test(n);
        const hasAudio = /<audio[^>]*src="sound\.mp3"[^>]*controls[^>]*>[\s\S]*<\/audio>/.test(n) || /<audio[^>]*controls[^>]*src="sound\.mp3"[^>]*>[\s\S]*<\/audio>/.test(n);
        const hasIframe = /<iframe[^>]*src="https:\/\/example\.com"[^>]*>[\s\S]*<\/iframe>/.test(n);
        if (hasVideo && hasAudio && hasIframe) return "pass";
        if (!hasVideo) return "wrong_tag";
        if (!hasAudio) return "wrong_tag";
        if (!hasIframe) return "wrong_tag";
        return "generic";
      },
    },
  },

  ,
  {
    id: 11,
    title: "Boot the Navigation Computer",
    subtitle: "Meta & Head",
    badge: "ðŸ§ ",
    badgeName: "Nav Brain",
    shipPart: "NAV BRAIN MODULE",
    storyIntro: "Projector online! Your navigation computer has no instructions for how to present itself to the galaxy search networks. The head section is like the control panel label â€” invisible to passengers but essential for the ship to function correctly.",
    theory: [
      {
        heading: "Crack Open the Control Panel",
        body: "Every HTML page has two main sections. The body is everything users SEE â€” text, images, buttons, all of it. The head is everything the browser READS but never shows on screen â€” the title in the browser tab, instructions for search engines, links to stylesheets. Think of it like a blueprint inside the wall. Passengers never see it but the whole building depends on it. Is the head section really necessary? Technically a page works without it â€” but it will have no title, Google won't understand it properly, and it might display broken characters. In real professional work you always include it. Will you learn more about head later? Yes â€” when you get to CSS you'll add link tags in the head to connect your stylesheet, and in JavaScript you'll add script tags. The head section gets busier as your projects grow.",
        anatomy: [
          { text: "<!DOCTYPE html>", color: "#ffe94d", highlight: "#ffe94d", label: "<!DOCTYPE html>", explain: "Always the very first line of every HTML file. Tells the browser this is modern HTML5. Never skip this." },
          { text: "\n<html>", color: "#00f5c4", highlight: "#00f5c4", label: "<html>", explain: "The root element that wraps the entire page." },
          { text: "\n<head>", color: "#a98dff", highlight: "#a98dff", label: "<head>", explain: "Opens the invisible control panel â€” everything in here helps the browser and search engines understand the page." },
          { text: "\n</head>\n<body>", color: "#00f5c4", highlight: "#00f5c4", label: "</head><body>", explain: "Close head, open body. Everything visible goes in body." },
        ],
        miniChallenge: {
          id: "m11a", xp: 20,
          instruction: "Crack it open! Write a basic HTML page shell with DOCTYPE, html, head, and body tags",
          hint1: "DOCTYPE first, then html wrapping head and body",
          hint2: "<!DOCTYPE html><html><head></head><body></body></html>",
          hint3: "<!DOCTYPE html><html><head></head><body></body></html>",
          walkthrough: [
            "First line: <!DOCTYPE html>",
            "Open: <html>",
            "Add: <head></head>",
            "Add: <body></body>",
            "Close: </html>",
          ],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<!doctype html>/.test(n) && /<html/.test(n) && /<head>/.test(n) && /<body>/.test(n)) return "pass";
            if (!/<html/.test(n)) return "wrong_tag";
            if (!/<head/.test(n)) return "wrong_tag";
            if (!/<body/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Upload the Charset Encoder",
        body: "The charset meta tag tells the browser what character encoding to use â€” basically what alphabet and symbol set to expect. UTF-8 is the universal standard that covers every character from every language on Earth including emojis, special punctuation, and mathematical symbols. Without it, characters like Ã©, Ã±, ä¸­, or even some quote marks can show up as garbled symbols. Is UTF-8 the only option? There are other encodings like UTF-16 and ISO-8859-1 but you will essentially never use them. UTF-8 is the correct answer 100% of the time. Just always write it exactly like this and never think about it again â€” it's one of those things you copy-paste into every single project for the rest of your career.",
        anatomy: [
          { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Meta tags give the browser invisible instructions â€” no closing tag needed" },
          { text: "charset=\"UTF-8\"", color: "#ffe94d", highlight: "#ffe94d", label: "charset", explain: "Tells the browser to expect every character from every language on Earth" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the meta tag â€” no closing tag needed" },
        ],
        miniChallenge: {
          id: "m11b", xp: 20,
          instruction: "Upload the encoder! Write a meta tag with charset set to UTF-8",
          hint1: "Meta tags are void elements â€” no closing tag",
          hint2: '<meta charset="UTF-8">',
          hint3: '<meta charset="UTF-8">',
          walkthrough: ['Write: <meta charset="UTF-8">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<meta[^>]*charset="utf-8"[^>]*>/.test(n)) return "pass";
            if (!/<meta/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Mobile Scanner",
        body: "The viewport meta tag is the single most important line for making your page work on phones. Without it, mobile browsers assume your page is designed for a desktop and zoom way out â€” making everything tiny and unreadable. This one line tells the browser to match the screen width of whatever device is viewing the page and start at normal zoom. Will you need to customize this later? Sometimes yes â€” certain apps need specific viewport settings for things like preventing user zoom or targeting specific device widths. But the line you're learning right now is the correct default for literally every website and app you will ever build. When you get to CSS you'll learn responsive design which works hand-in-hand with this tag to make layouts that adapt beautifully to any screen size.",
        anatomy: [
          { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Another meta tag" },
          { text: "name=\"viewport\" ", color: "#ffe94d", highlight: "#ffe94d", label: "name=viewport", explain: "Identifies this as the viewport setting" },
          { text: "content=\"width=device-width, initial-scale=1.0\"", color: "#39ff14", highlight: "#39ff14", label: "content", explain: "Match the page width to the device screen at normal zoom" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag" },
        ],
        miniChallenge: {
          id: "m11c", xp: 25,
          instruction: 'Calibrate the scanner! Write a viewport meta tag with content="width=device-width, initial-scale=1.0"',
          hint1: "Two attributes â€” name and content",
          hint2: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          hint3: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          walkthrough: ['Write: <meta name="viewport" content="width=device-width, initial-scale=1.0">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<meta[^>]*name="viewport"[^>]*>/.test(n) && /device-width/.test(n)) return "pass";
            if (!/<meta/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Set the Mission Title",
        body: "The <title> tag controls the text shown in the browser tab â€” that little label at the top of your browser window. It's also the clickable blue headline that appears in Google search results, which makes it more important than most beginners realize. A well-written title can be the difference between someone clicking your link or scrolling past it. Keep it under 60 characters, be specific, and put the most important words first. Is there more to learn about titles? In professional SEO (Search Engine Optimization) there are strategies around title length, keyword placement, and formatting â€” but the tag itself is exactly what you're learning now. The complexity is in the words you choose, not the HTML.",
        anatomy: [
          { text: "<title>", color: "#ff9f43", highlight: "#ff9f43", label: "<title>", explain: "Opens the title â€” goes inside head, never body" },
          { text: "Signal Lost", color: "#c8f0ff", highlight: "#39ff14", label: "page title", explain: "This exact text appears in the browser tab and Google search results" },
          { text: "</title>", color: "#ff9f43", highlight: "#ff9f43", label: "</title>", explain: "Closes the title tag" },
        ],
        miniChallenge: {
          id: "m11d", xp: 20,
          instruction: "Set the mission title! Write a title tag that says: My Alien Page",
          hint1: "Title works just like h1 but goes in head",
          hint2: "<title>My Alien Page</title>",
          hint3: "<title>My Alien Page</title>",
          walkthrough: ["Write: <title>My Alien Page</title>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<title>[\s\S]*my alien page[\s\S]*<\/title>/.test(n)) return "pass";
            if (!/<title/.test(n)) return "wrong_tag";
            if (/<title/.test(n) && !/<\/title>/.test(n)) return "no_close";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Full Navigation Computer Schematic",
        body: "Here is the complete boilerplate that every single webpage on the internet starts with â€” the full head section plus a basic body:",
        codeBlock: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Signal Lost</title>\n</head>\n<body>\n  <h1>DISTRESS SIGNAL</h1>\n  <p>Help! Ship down in Sector 7.</p>\n</body>\n</html>",
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss11", xp: 70,
      instruction: ["ðŸ›¸ Boot the navigation computer!", "Write a complete page with DOCTYPE and html tags", "Inside head: add charset UTF-8 meta, viewport meta, and a title that says: Rescue Mission", "Inside body: add an h1 that says: Help Needed and a paragraph that says: Ship crashed in Sector 7"],
      hint1: "DOCTYPE first, then html with head and body â€” metas and title in head, content in body",
      hint2: '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rescue Mission</title></head><body><h1>Help Needed</h1><p>Ship crashed in Sector 7</p></body></html>',
      hint3: '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rescue Mission</title></head><body><h1>Help Needed</h1><p>Ship crashed in Sector 7</p></body></html>',
      walkthrough: [
        "Start: <!DOCTYPE html><html>",
        "Open head: <head>",
        'Add: <meta charset="UTF-8">',
        'Add: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        "Add: <title>Rescue Mission</title>",
        "Close head open body: </head><body>",
        "Add: <h1>Help Needed</h1>",
        "Add: <p>Ship crashed in Sector 7</p>",
        "Close: </body></html>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasDoctype = /<!doctype html>/.test(n);
        const hasCharset = /<meta[^>]*charset="utf-8"[^>]*>/.test(n);
        const hasViewport = /<meta[^>]*viewport[^>]*>/.test(n);
        const hasTitle = /<title>[\s\S]*rescue mission[\s\S]*<\/title>/.test(n);
        const hasH1 = /<h1>[\s\S]*help needed[\s\S]*<\/h1>/.test(n);
        const hasP = /<p>[\s\S]*ship crashed[\s\S]*<\/p>/.test(n);
        if (hasDoctype && hasCharset && hasViewport && hasTitle && hasH1 && hasP) return "pass";
        if (!hasDoctype) return "wrong_tag";
        if (!hasCharset) return "no_src";
        if (!hasViewport) return "no_src";
        if (!hasTitle) return "wrong_tag";
        if (!hasH1) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 12,
    title: "Repair the Universal Translator",
    subtitle: "Accessibility",
    badge: "â™¿",
    badgeName: "Translator Core",
    shipPart: "TRANSLATOR MODULE",
    storyIntro: "Nav computer online! Your universal translator is damaged â€” your distress signal cannot reach all beings. Accessibility means making your webpage work for everyone, including people who are blind, use keyboards, or need extra help understanding your content.",
    theory: [
      {
        heading: "Teach the Translator to Speak",
        body: "A screen reader is software that reads webpages out loud for people who are blind or have low vision. It reads every single element on the page in order. If your image has no alt text, it literally says the word 'image' and moves on â€” completely useless to someone who can't see it. You already learned the alt attribute back in Mission 2. Now you understand WHY it matters. Is descriptive alt text really that important? Yes â€” and not just for blind users. Alt text also shows up when images fail to load, it helps Google understand your images for search ranking, and it's legally required in many countries for public-facing websites. Will you learn more about accessibility later? Yes â€” Mission 12 covers aria-label and role attributes which go even deeper. And in JavaScript you'll learn to manage focus and keyboard navigation for fully accessible interactive components.",
        anatomy: [
          { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "An image tag" },
          { text: "src=\"ship.jpg\" ", color: "#ffe94d", highlight: "#ffe94d", label: "src", explain: "Where the image lives" },
          { text: "alt=\"A crashed alien spaceship in a desert at sunset\"", color: "#39ff14", highlight: "#39ff14", label: "descriptive alt", explain: "Screen readers speak this. Be specific â€” not just spaceship but describe what you actually see." },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag" },
        ],
        miniChallenge: {
          id: "m12a", xp: 20,
          instruction: 'Write an image with src="rescue.jpg" and a descriptive alt: A rescue team arriving at a crash site',
          hint1: "alt should describe the image in plain words â€” be specific",
          hint2: '<img src="rescue.jpg" alt="A rescue team arriving at a crash site">',
          hint3: '<img src="rescue.jpg" alt="A rescue team arriving at a crash site">',
          walkthrough: ['Write: <img src="rescue.jpg" alt="A rescue team arriving at a crash site">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<img[^>]*src="rescue\.jpg"[^>]*alt="a rescue team arriving at a crash site"[^>]*>/.test(n) ||
                /<img[^>]*alt="a rescue team arriving at a crash site"[^>]*src="rescue\.jpg"[^>]*>/.test(n)) return "pass";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!(/alt/.test(n))) return "no_alt";
            return "generic";
          },
        },
      },
      {
        heading: "Install the Label Decoder",
        body: "Sometimes interactive elements have no visible text â€” like an X button to close a modal, a hamburger menu icon, or a magnifying glass for search. A screen reader hitting one of these would just say 'button' which tells a blind user absolutely nothing about what it does. aria-label is an invisible label that only screen readers can see. Sighted users see the icon, blind users hear the label spoken aloud. Is aria-label the only way to label things for accessibility? No â€” there's also aria-labelledby which points to an existing element as the label, and aria-describedby which adds a longer description. But aria-label is the most common and the one you'll use most often. Will you learn more? In professional frontend development accessibility is a deep topic. But knowing alt, aria-label, and role puts you ahead of the majority of developers working today.",
        anatomy: [
          { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "A button that shows only an icon" },
          { text: "aria-label=\"Close menu\"", color: "#ffe94d", highlight: "#ffe94d", label: "aria-label", explain: "Screen readers speak this instead of the button content" },
          { text: ">âœ•</button>", color: "#c8f0ff", highlight: "#39ff14", label: ">icon</button>", explain: "Sighted users see âœ•. Blind users hear Close menu button." },
        ],
        miniChallenge: {
          id: "m12b", xp: 25,
          instruction: 'Write a button with aria-label="Send distress signal" that shows the text: SOS',
          hint1: "aria-label goes inside the opening button tag like any attribute",
          hint2: '<button aria-label="Send distress signal">SOS</button>',
          hint3: '<button aria-label="Send distress signal">SOS</button>',
          walkthrough: ['Write: <button aria-label="Send distress signal">SOS</button>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<button[^>]*aria-label="send distress signal"[^>]*>[\s\S]*sos[\s\S]*<\/button>/.test(n)) return "pass";
            if (!/<button/.test(n)) return "wrong_tag";
            if (!(/aria-label/.test(n))) return "no_href";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Role Identifier",
        body: "The role attribute tells screen readers what an element IS when the HTML tag alone doesn't communicate it clearly enough. A <div> has zero meaning by itself â€” but add role='alert' and screen readers know to announce it immediately and urgently when it appears on screen. Other useful roles include 'navigation', 'search', 'dialog', and 'status'. Should you use role everywhere? No â€” this is important. If you use semantic HTML tags properly (header, nav, main, footer, article, section) you rarely need role at all because those tags already carry meaning. Role is a fallback for when you're stuck using a generic div or span. The golden rule: use the right semantic tag first, reach for role only when you can't. This will all make more sense as you keep building real pages.",
        anatomy: [
          { text: "<div ", color: "#00f5c4", highlight: "#00f5c4", label: "<div", explain: "A generic div with no meaning on its own" },
          { text: "role=\"alert\"", color: "#ffe94d", highlight: "#ffe94d", label: "role=alert", explain: "Tells screen readers: announce this immediately when it appears" },
          { text: ">Hull breach detected!</div>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</div>", explain: "Screen readers announce this instantly when it shows up on screen" },
        ],
        miniChallenge: {
          id: "m12c", xp: 25,
          instruction: 'Write a div with role="alert" containing: Engine failure detected',
          hint1: "role goes inside the opening div tag",
          hint2: '<div role="alert">Engine failure detected</div>',
          hint3: '<div role="alert">Engine failure detected</div>',
          walkthrough: ['Write: <div role="alert">Engine failure detected</div>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<div[^>]*role="alert"[^>]*>[\s\S]*engine failure detected[\s\S]*<\/div>/.test(n)) return "pass";
            if (!/<div/.test(n)) return "wrong_tag";
            if (!(/role/.test(n))) return "no_href";
            if (/<div/.test(n) && !/<\/div>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Full Translator Schematic",
        body: "Here is what an accessible page looks like â€” every element labeled, every image described, every interactive element understandable by screen readers:",
        codeBlock: "<header>\n  <h1>Signal Lost</h1>\n  <button aria-label=\"Open navigation menu\">â˜°</button>\n</header>\n\n<main>\n  <img src=\"crash.jpg\" alt=\"An alien spacecraft crashed in a field at night\">\n\n  <div role=\"alert\">\n    <p>Warning: Oxygen levels critical</p>\n  </div>\n\n  <form>\n    <label for=\"name\">Your Name:</label>\n    <input id=\"name\" type=\"text\">\n    <button type=\"submit\" aria-label=\"Submit rescue request\">Send</button>\n  </form>\n</main>",
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss12", xp: 70,
      instruction: ["ðŸ›¸ Repair the universal translator!", "Write a header with an h1 that says: Mission Control", 'Write a button with aria-label: Toggle navigation that shows the text: Menu', 'Write an img with src: crew.jpg and alt: Three astronauts in spacesuits walking toward a rocket', 'Write a div with role: alert containing: All systems go'],
      hint1: "Four elements â€” header with h1, button with aria-label, img with descriptive alt, div with role",
      hint2: '<header><h1>Mission Control</h1></header><button aria-label="Toggle navigation">â˜°</button><img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket"><div role="alert">All systems go</div>',
      hint3: '<header><h1>Mission Control</h1></header><button aria-label="Toggle navigation">â˜°</button><img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket"><div role="alert">All systems go</div>',
      walkthrough: [
        "Write: <header><h1>Mission Control</h1></header>",
        'Write: <button aria-label="Toggle navigation">â˜°</button>',
        'Write: <img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket">',
        'Write: <div role="alert">All systems go</div>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeader = /<header>[\s\S]*mission control[\s\S]*<\/header>/.test(n);
        const hasButton = /<button[^>]*aria-label="toggle navigation"[^>]*>/.test(n);
        const hasImg = /<img[^>]*src="crew\.jpg"[^>]*>/.test(n) && /three astronauts/.test(n);
        const hasAlert = /<div[^>]*role="alert"[^>]*>[\s\S]*all systems go[\s\S]*<\/div>/.test(n);
        if (hasHeader && hasButton && hasImg && hasAlert) return "pass";
        if (!hasHeader) return "wrong_tag";
        if (!hasButton) return "wrong_tag";
        if (!hasImg) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },

  ,
  {
    id: 13,
    title: "Decode the Hidden Messages",
    subtitle: "Comments & Special Characters",
    badge: "ðŸ’¬",
    badgeName: "Decoder Core",
    shipPart: "DECODER MODULE",
    storyIntro: "Universal translator online! Your ship is receiving hidden messages embedded in the alien broadcast â€” invisible notes that only developers can see. You also need to display some characters that HTML normally treats as code. Time to learn how to hide messages and display special symbols.",
    theory: [
      {
        heading: "Plant the Hidden Transmitter",
        body: "An HTML comment is a note you write in your code that the browser completely ignores â€” it never shows up on the page. Comments are invisible to users but visible to anyone reading the source code. Developers use them to leave notes for themselves, explain confusing sections, or temporarily disable code without deleting it. Think of it like writing notes in pencil in the margins of a book â€” readers of the book never see them, but you can flip back and read them anytime. Is this the only use? No â€” comments are also used by teams to communicate, by teachers to annotate student code, and by developers to track what still needs to be built. You will use comments constantly in real projects.",
        anatomy: [
          { text: "<!--", color: "#ffe94d", highlight: "#ffe94d", label: "<!--", explain: "Opens the comment â€” everything after this is hidden from the browser" },
          { text: " This is a note only developers can see ", color: "#7b78a0", highlight: "#7b78a0", label: "comment text", explain: "Whatever you write here is completely invisible to users â€” the browser ignores it entirely" },
          { text: "-->", color: "#ffe94d", highlight: "#ffe94d", label: "-->", explain: "Closes the comment â€” everything after this is visible again" },
        ],
        miniChallenge: {
          id: "m13a", xp: 20,
          instruction: "Plant the transmitter! Write a comment that says: This is my first comment",
          hint1: "Start with <!-- and end with -->",
          hint2: "<!-- ... -->",
          hint3: "<!-- This is my first comment -->",
          walkthrough: ["Open: <!--", "Write your note: This is my first comment", "Close: -->", "Full answer: <!-- This is my first comment -->"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<!--[\s\S]*this is my first comment[\s\S]*-->/.test(n)) return "pass";
            if (/<!--/.test(n) && !(/-->/.test(n))) return "no_close";
            if (!(/<!--/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Disable the Rogue System",
        body: "One of the most useful things you can do with comments is temporarily disable a piece of code without deleting it. Wrap any HTML in comment tags and the browser acts like it does not exist. Then when you want it back, just remove the comment. This is called commenting out code and every developer does it constantly. It is much safer than deleting something you might need again later.",
        anatomy: [
          { text: "<!-- ", color: "#ffe94d", highlight: "#ffe94d", label: "<!--", explain: "Opens the comment â€” this entire button is now disabled" },
          { text: "<button>Old Button</button>", color: "#7b78a0", highlight: "#7b78a0", label: "disabled code", explain: "This button exists in the code but the browser ignores it completely" },
          { text: " -->", color: "#ffe94d", highlight: "#ffe94d", label: "-->", explain: "Closes the comment â€” the button is hidden but not deleted" },
        ],
        miniChallenge: {
          id: "m13b", xp: 20,
          instruction: "Disable the rogue system! Write a comment that wraps and disables this button: <button>Old Button</button>",
          hint1: "Put <!-- before the button and --> after it",
          hint2: "<!-- <button>Old Button</button> -->",
          hint3: "<!-- <button>Old Button</button> -->",
          walkthrough: ["Open comment: <!--", "Add the button: <button>Old Button</button>", "Close comment: -->", "Full answer: <!-- <button>Old Button</button> -->"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<!--[\s\S]*<button>[\s\S]*old button[\s\S]*<\/button>[\s\S]*-->/.test(n)) return "pass";
            if (/<!--/.test(n) && !(/-->/.test(n))) return "no_close";
            if (!(/<!--/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Translate the Alien Symbols",
        body: "Some characters have special meaning in HTML â€” like < and > which the browser reads as tag brackets. If you want to actually DISPLAY those characters on the page, you have to use special codes called HTML entities. Each entity starts with & and ends with ;. The most important ones: &amp; displays as &, &lt; displays as <, &gt; displays as >, &copy; displays as the copyright symbol Â©, and &nbsp; inserts a space that never collapses or breaks across lines. Will you use these constantly? The < and > ones you will use whenever you want to show code examples on a page. &amp; and &copy; come up often in professional work. &nbsp; is everywhere in real codebases.",
        anatomy: [
          { text: "&lt;", color: "#00f5c4", highlight: "#00f5c4", label: "&lt;", explain: "Displays the < character â€” without this the browser thinks it is a tag opening" },
          { text: "h1", color: "#c8f0ff", highlight: "#39ff14", label: "tag name", explain: "Regular text" },
          { text: "&gt;", color: "#00f5c4", highlight: "#00f5c4", label: "&gt;", explain: "Displays the > character â€” the closing bracket" },
          { text: "Hello", color: "#c8f0ff", highlight: "#39ff14", label: "text", explain: "The content" },
          { text: "&lt;/h1&gt;", color: "#00f5c4", highlight: "#00f5c4", label: "&lt;/h1&gt;", explain: "Using entities to display the closing tag as text on the page" },
        ],
        miniChallenge: {
          id: "m13c", xp: 25,
          instruction: "Translate the symbols! Write a paragraph that displays: 2 & 2 = 4 â€” using &amp; for the ampersand",
          hint1: "Use &amp; wherever you want to show the & symbol",
          hint2: "<p>2 &amp; 2 = 4</p>",
          hint3: "<p>2 &amp; 2 = 4</p>",
          walkthrough: ["Open: <p>", "Write: 2 ", "Add ampersand entity: &amp;", "Continue: 2 = 4", "Close: </p>", "Full answer: <p>2 &amp; 2 = 4</p>"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<p>[\s\S]*2[\s\S]*&amp;[\s\S]*2[\s\S]*=[\s\S]*4[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!(/&amp;/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Decoder Schematic",
        body: "Here is what comments and special characters look like in a real page â€” developers use both constantly. Notice how the commented code is completely invisible in the preview even though it exists in the source:",
        codeBlock: `<!-- Navigation will go here later -->
<header>
  <h1>Signal Lost &copy; 2026</h1>
  <!-- <button>Old Login</button> -->
  <button>New Login</button>
</header>

<main>
  <p>Use the &lt;h1&gt; tag for main headings.</p>
  <p>Tom &amp; Jerry is a classic show.</p>
  <p>Price:&nbsp;$9.99</p>
</main>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss13", xp: 70,
      instruction: ["ðŸ›¸ Decode the full transmission!", "Write a comment at the top that says: Page header section", "Write a header with an h1 that says: Welcome & Hello using &amp; for the ampersand", "Write a paragraph that shows the text: Use the <p> tag â€” using &lt; and &gt; around the p"],
      hint1: "Comment first, then header with entity, then paragraph with entities",
      hint2: "<!-- Page header section --><header><h1>Welcome &amp; Hello</h1></header><p>Use the &lt;p&gt; tag</p>",
      hint3: "<!-- Page header section --><header><h1>Welcome &amp; Hello</h1></header><p>Use the &lt;p&gt; tag</p>",
      walkthrough: [
        "Write the comment: <!-- Page header section -->",
        "Write the header: <header><h1>Welcome &amp; Hello</h1></header>",
        "Write the paragraph: <p>Use the &lt;p&gt; tag</p>",
      ],
      smartCheck: (v) => {
        const n = v.toLowerCase();
        if (!n.trim()) return "empty";
        const hasComment = /<!--[\s\S]*page header section[\s\S]*-->/.test(n);
        const hasAmp = /<h1>[\s\S]*welcome[\s\S]*&amp;[\s\S]*hello[\s\S]*<\/h1>/.test(n);
        const hasEntity = /<p>[\s\S]*&lt;p&gt;[\s\S]*<\/p>/.test(n) || /<p>[\s\S]*&lt;p[\s\S]*<\/p>/.test(n);
        if (hasComment && hasAmp && hasEntity) return "pass";
        if (!hasComment) return "wrong_tag";
        if (!hasAmp) return "wrong_tag";
        if (!hasEntity) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 14,
    title: "Patch the Visual Interface",
    subtitle: "HTML + CSS Intro",
    badge: "ðŸŽ¨",
    badgeName: "Visual Core",
    shipPart: "VISUAL MODULE",
    storyIntro: "Decoder online! Your ship visual interface is grey and lifeless â€” all the HTML you have learned creates structure but no visual style. CSS is the language that makes things look good. This mission is a preview â€” you will learn CSS properly in your next adventure, but right now you need just enough to understand how HTML and CSS connect.",
    theory: [
      {
        heading: "Boot the Visual Subsystem",
        body: "HTML builds the structure of a page. CSS styles it. Think of HTML as the skeleton of a building â€” walls, floors, rooms. CSS is the interior design â€” paint colors, furniture, lighting. They are two completely separate languages that work together. HTML lives in .html files. CSS lives in .css files. They connect through a link tag in the head section. Right now you will learn inline CSS â€” style written directly on an HTML element using the style attribute. It is not the professional way to do it but it is the fastest way to see CSS in action and understand how it works.",
        anatomy: [
          { text: "<p ", color: "#00f5c4", highlight: "#00f5c4", label: "<p", explain: "A regular paragraph tag" },
          { text: 'style="', color: "#ffe94d", highlight: "#ffe94d", label: 'style="', explain: "Opens the style attribute â€” CSS goes inside here" },
          { text: "color: red;", color: "#ff4d6d", highlight: "#ff4d6d", label: "color: red;", explain: "One CSS rule â€” property: value; â€” this makes the text red" },
          { text: '"', color: "#ffe94d", highlight: "#ffe94d", label: '"', explain: "Closes the style attribute" },
          { text: ">Hello</p>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</p>", explain: "The paragraph content â€” it will appear in red" },
        ],
        miniChallenge: {
          id: "m14a", xp: 20,
          instruction: 'Boot the visual system! Write a paragraph that says: Signal Restored â€” with style="color: green;"',
          hint1: 'Add style="color: green;" inside the opening p tag',
          hint2: '<p style="color: green;">Signal Restored</p>',
          hint3: '<p style="color: green;">Signal Restored</p>',
          walkthrough: ['Open: <p', 'Add style: style="color: green;"', 'Close opening tag: >', 'Add text: Signal Restored', 'Close: </p>', 'Full answer: <p style="color: green;">Signal Restored</p>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p[^>]*style="[^"]*color:\s*green[^"]*"[^>]*>[\s\S]*signal restored[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!(/style/.test(n))) return "no_src";
            if (!(/green/.test(n))) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Style Properties",
        body: "CSS rules always follow the same pattern: property: value; â€” the property is WHAT you want to change and the value is WHAT you want to change it to. You can stack multiple CSS rules inside one style attribute by separating them with semicolons. The most common properties you will use: color changes text color, background-color changes the background, font-size changes text size (use px for pixels), font-weight: bold makes text bold, text-align: center centers text, and padding adds space inside an element. Will you learn more? Yes â€” there are hundreds of CSS properties. But these six cover a huge percentage of what you see on real websites.",
        anatomy: [
          { text: '<h1 style="', color: "#00f5c4", highlight: "#00f5c4", label: "<h1 style=", explain: "An h1 with a style attribute" },
          { text: "color: cyan;", color: "#00f5c4", highlight: "#00f5c4", label: "color", explain: "Changes the text color to cyan" },
          { text: " background-color: black;", color: "#39ff14", highlight: "#39ff14", label: "background-color", explain: "Changes the background color behind the text" },
          { text: ' font-size: 32px;"', color: "#ffe94d", highlight: "#ffe94d", label: "font-size", explain: "Sets the text size to 32 pixels â€” px means pixels" },
          { text: ">SIGNAL LOST</h1>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</h1>", explain: "The heading content with all three styles applied" },
        ],
        miniChallenge: {
          id: "m14b", xp: 25,
          instruction: 'Calibrate the properties! Write an h1 that says: Mission Control â€” with style="color: white; background-color: black;"',
          hint1: "Multiple CSS properties go in the same style attribute separated by semicolons",
          hint2: '<h1 style="color: white; background-color: black;">Mission Control</h1>',
          hint3: '<h1 style="color: white; background-color: black;">Mission Control</h1>',
          walkthrough: ['Open: <h1', 'Add style: style="color: white; background-color: black;"', 'Close: >', 'Add text: Mission Control', 'Close: </h1>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<h1[^>]*style="[^"]*color:\s*white[^"]*"[^>]*>[\s\S]*mission control[\s\S]*<\/h1>/.test(n) && /background-color:\s*black/.test(n)) return "pass";
            if (!/<h1/.test(n)) return "wrong_tag";
            if (!(/style/.test(n))) return "no_src";
            return "generic";
          },
        },
      },
      {
        heading: "Link the Style Engine",
        body: "Inline styles are quick but messy â€” imagine adding style attributes to every single element on a 100-page website. That is why CSS normally lives in its own separate file called a stylesheet. You connect it to your HTML with a single link tag in the head section. Then one stylesheet controls the look of every page on your site. Change the stylesheet once and every page updates instantly. This is the professional way. The class and id attributes on HTML elements are how the stylesheet knows which elements to style â€” you will learn both properly in Neon Collapse. For now just understand that they exist.",
        anatomy: [
          { text: '<link ', color: "#a98dff", highlight: "#a98dff", label: "<link", explain: "A link tag in the head section â€” connects external files to your HTML" },
          { text: 'rel="stylesheet" ', color: "#ffe94d", highlight: "#ffe94d", label: 'rel="stylesheet"', explain: "Tells the browser this is a CSS stylesheet â€” rel stands for relationship" },
          { text: 'href="style.css"', color: "#39ff14", highlight: "#39ff14", label: 'href="style.css"', explain: "The filename of your CSS file â€” just like href on a link tag" },
          { text: ">", color: "#a98dff", highlight: "#a98dff", label: ">", explain: "Closes the tag â€” link is a void element, no closing tag needed" },
        ],
        miniChallenge: {
          id: "m14c", xp: 25,
          instruction: 'Link the style engine! Write a link tag that connects a stylesheet called: main.css',
          hint1: 'rel="stylesheet" and href points to your CSS file',
          hint2: '<link rel="stylesheet" href="main.css">',
          hint3: '<link rel="stylesheet" href="main.css">',
          walkthrough: ['Write: <link', 'Add rel: rel="stylesheet"', 'Add href: href="main.css"', 'Close: >'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<link[^>]*rel="stylesheet"[^>]*href="main\.css"[^>]*>/.test(n) || /<link[^>]*href="main\.css"[^>]*rel="stylesheet"[^>]*>/.test(n)) return "pass";
            if (!/<link/.test(n)) return "wrong_tag";
            if (!(/stylesheet/.test(n))) return "no_src";
            if (!(/main\.css/.test(n))) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Full Visual Interface Schematic",
        body: "Here is what inline CSS looks like in action â€” and a preview of how a real stylesheet would connect. Play with the colors and sizes in the editor and watch them change live. This is the beginning of what CSS can do. In Neon Collapse you will go much deeper:",
        codeBlock: `<!DOCTYPE html>
<html>
<head>
  <title>Signal Lost</title>
  <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: #020b18; color: #eae6ff;">

  <h1 style="color: #00f5c4; font-size: 48px; text-align: center;">
    SIGNAL LOST
  </h1>

  <p style="color: #7b78a0; text-align: center;">
    Crash-landed near Earth. Learning HTML to get home.
  </p>

  <button style="background-color: #39ff14; color: black; padding: 10px 24px;">
    Send Distress Signal
  </button>

</body>
</html>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss14", xp: 80,
      instruction: ["ðŸ›¸ Patch the visual interface!", "Write an h1 that says: Alien Transmission with style making the text cyan and font-size 36px", "Write a paragraph that says: Signal strength: 100% with style making the background-color black and color white", "Write a button that says: Boost Signal with style making the background-color green"],
      hint1: "Three elements each with their own style attribute â€” h1, p, and button",
      hint2: '<h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1><p style="background-color: black; color: white;">Signal strength: 100%</p><button style="background-color: green;">Boost Signal</button>',
      hint3: '<h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1><p style="background-color: black; color: white;">Signal strength: 100%</p><button style="background-color: green;">Boost Signal</button>',
      walkthrough: [
        'Write: <h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1>',
        'Write: <p style="background-color: black; color: white;">Signal strength: 100%</p>',
        'Write: <button style="background-color: green;">Boost Signal</button>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasH1 = /<h1[^>]*style="[^"]*cyan[^"]*"[^>]*>[\s\S]*alien transmission[\s\S]*<\/h1>/.test(n) || /<h1[^>]*>[\s\S]*alien transmission[\s\S]*<\/h1>/.test(n) && /cyan/.test(n);
        const hasP = /<p[^>]*style="[^"]*"[^>]*>[\s\S]*signal strength[\s\S]*<\/p>/.test(n) && /background-color:\s*black/.test(n);
        const hasButton = /<button[^>]*style="[^"]*green[^"]*"[^>]*>[\s\S]*boost signal[\s\S]*<\/button>/.test(n);
        if (hasH1 && hasP && hasButton) return "pass";
        if (!hasH1) return "wrong_tag";
        if (!hasP) return "wrong_tag";
        if (!hasButton) return "wrong_tag";
        return "generic";
      },
    },
  },

];



export { MISSIONS };
