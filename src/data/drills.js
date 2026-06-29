// ── DRILL VARIATIONS ─────────────────────────────────────────
// Each mini challenge concept gets extra practice reps with different content
const DRILLS = {
  m1a: [ // tags concept — using h1 as example
    { instruction: "Write an h1 tag for a haunted house attraction called: Nightmare Manor", check: (v) => /<h1>\s*nightmare manor\s*<\/h1>/i.test(v), answer: "<h1>Nightmare Manor</h1>" },
    { instruction: "Write an h1 tag for your favorite restaurant — make up a name!", check: (v) => /<h1>[^<]+<\/h1>/i.test(v), answer: "<h1>Taco Palace</h1>" },
    { instruction: "Write an h2 tag for a section called: Today's Specials", check: (v) => /<h2>\s*today's specials\s*<\/h2>/i.test(v) || /<h2>\s*today's specials\s*<\/h2>/i.test(v), answer: "<h2>Today's Specials</h2>" },
  ],
  m1b: [ // headings concept
    { instruction: "Write an h1 for a superhero origin story called: The Rise of Voltage", check: (v) => /<h1>\s*the rise of voltage\s*<\/h1>/i.test(v), answer: "<h1>The Rise of Voltage</h1>" },
    { instruction: "Write an h2 for a recipe section called: Ingredients", check: (v) => /<h2>\s*ingredients\s*<\/h2>/i.test(v), answer: "<h2>Ingredients</h2>" },
    { instruction: "Write an h3 for a subsection called: Serving Suggestions", check: (v) => /<h3>\s*serving suggestions\s*<\/h3>/i.test(v), answer: "<h3>Serving Suggestions</h3>" },
  ],
  m1c: [ // paragraphs concept
    { instruction: "Write a paragraph introducing yourself as an alien visiting Earth for the first time", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Greetings Earthlings. I have traveled 40 light years to visit your planet.</p>" },
    { instruction: "Write a paragraph describing your favorite food — make it sound delicious", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Nothing beats a perfectly crispy slice of pepperoni pizza fresh from the oven.</p>" },
    { instruction: "Write a paragraph warning someone about a danger ahead", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Warning: the bridge ahead is unstable. Proceed with extreme caution.</p>" },
  ],
  m2a: [ // links concept
    { instruction: 'Write a link to https://spotify.com that says: Listen Now', check: (v) => /<a[^>]*href="https:\/\/spotify\.com"[^>]*>\s*listen now\s*<\/a>/i.test(v), answer: '<a href="https://spotify.com">Listen Now</a>' },
    { instruction: 'Write a link to https://wikipedia.org that says: Learn More', check: (v) => /<a[^>]*href="https:\/\/wikipedia\.org"[^>]*>\s*learn more\s*<\/a>/i.test(v), answer: '<a href="https://wikipedia.org">Learn More</a>' },
    { instruction: 'Write a link to https://youtube.com that says: Watch the Tutorial', check: (v) => /<a[^>]*href="https:\/\/youtube\.com"[^>]*>\s*watch the tutorial\s*<\/a>/i.test(v), answer: '<a href="https://youtube.com">Watch the Tutorial</a>' },
  ],
  m2b: [ // images concept
    { instruction: 'Write an image of a puppy with src="puppy.jpg" and alt="A golden puppy sleeping on a blanket"', check: (v) => /<img[^>]*src="puppy\.jpg"[^>]*>|<img[^>]*alt=[^>]*puppy[^>]*>/i.test(v), answer: '<img src="puppy.jpg" alt="A golden puppy sleeping on a blanket">' },
    { instruction: 'Write an image of a mountain with src="mountain.jpg" and a descriptive alt', check: (v) => /<img[^>]*src="mountain\.jpg"[^>]*alt="[^"]+"[^>]*>|<img[^>]*alt="[^"]+"[^>]*src="mountain\.jpg"[^>]*>/i.test(v), answer: '<img src="mountain.jpg" alt="A snowy mountain peak at sunrise">' },
  ],
  m2c: [ // combining concept
    { instruction: 'Write an h2 that says: My Favorite Sites — then a link to https://netflix.com that says: Watch Movies', check: (v) => /<h2>[\s\S]*my favourite sites[\s\S]*<\/h2>/i.test(v) || /<h2>[\s\S]*my favorite sites[\s\S]*<\/h2>/i.test(v) && /<a[^>]*href="https:\/\/netflix\.com"[^>]*>/i.test(v), answer: '<h2>My Favorite Sites</h2><a href="https://netflix.com">Watch Movies</a>' },
    { instruction: 'Write an image of a logo with src="logo.png" and alt="Company logo" — then a link that says: Visit our site to https://example.com', check: (v) => /<img[^>]*src="logo\.png"[^>]*>/i.test(v) && /<a[^>]*href="https:\/\/example\.com"[^>]*>/i.test(v), answer: '<img src="logo.png" alt="Company logo"><a href="https://example.com">Visit our site</a>' },
  ],
  m3a: [ // ul concept
    { instruction: "Write a bullet list of 3 things you would pack for a camping trip", check: (v) => /<ul>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul><li>Tent</li><li>Sleeping bag</li><li>Flashlight</li></ul>" },
    { instruction: "Write a bullet list of your top 2 favorite movies — make them up if you want!", check: (v) => /<ul>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul><li>The Matrix</li><li>Interstellar</li></ul>" },
  ],
  m3b: [ // ol concept
    { instruction: "Write a numbered list of 3 steps to make a sandwich", check: (v) => /<ol>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ol>/i.test(v), answer: "<ol><li>Get two slices of bread</li><li>Add your fillings</li><li>Put it together and eat</li></ol>" },
    { instruction: "Write a numbered list of 2 steps to start a car", check: (v) => /<ol>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ol>/i.test(v), answer: "<ol><li>Insert the key</li><li>Turn the ignition</li></ol>" },
  ],
  m3c: [ // button concept
    { instruction: "Write a button for an online store that says: Add to Cart", check: (v) => /<button>\s*add to cart\s*<\/button>/i.test(v), answer: "<button>Add to Cart</button>" },
    { instruction: "Write a button for a newsletter signup that says: Subscribe", check: (v) => /<button>\s*subscribe\s*<\/button>/i.test(v), answer: "<button>Subscribe</button>" },
    { instruction: "Write a button for a dangerous action that says: Delete Account", check: (v) => /<button>\s*delete account\s*<\/button>/i.test(v), answer: "<button>Delete Account</button>" },
  ],
  m4a: [ // strong — builds on p, h tags, lists from m1-3
    { instruction: "Write a paragraph about a product sale where the word FREE is bold", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<strong>[\s\S]*free[\s\S]*<\/strong>/i.test(v), answer: "<p>Get a <strong>FREE</strong> gift with every order over $50.</p>" },
    { instruction: "Write an h2 then a paragraph where the word DANGER is bold", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<strong>[\s\S]*<\/strong>[\s\S]*<\/p>/i.test(v), answer: "<h2>Safety Warning</h2><p>This area is <strong>DANGEROUS</strong>. Proceed with caution.</p>" },
    { instruction: "Write a bullet list of 3 phone features where the word NEW is bold before one of them", check: (v) => /<ul>[\s\S]*<\/ul>/i.test(v) && /<strong>[\s\S]*new[\s\S]*<\/strong>/i.test(v), answer: "<ul><li>5000mAh battery</li><li><strong>NEW</strong> 200MP camera</li><li>Waterproof</li></ul>" },
  ],
  m4b: [ // em — builds on p, lists, links from m1-3
    { instruction: "Write a paragraph about a movie where the title is italic", check: (v) => /<p>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/p>/i.test(v), answer: "<p>My favorite film is <em>Interstellar</em> — I have watched it 6 times.</p>" },
    { instruction: "Write a bullet list of 3 books where all titles are italic", check: (v) => /<ul>[\s\S]*<\/ul>/i.test(v) && (v.match(/<em>/gi) || []).length >= 3, answer: "<ul><li><em>Dune</em></li><li><em>1984</em></li><li><em>The Alchemist</em></li></ul>" },
    { instruction: "Write a link to https://imdb.com where the link text is an italic movie title", check: (v) => /<a[^>]*href="https:\/\/imdb\.com"[^>]*>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/a>/i.test(v), answer: '<a href="https://imdb.com"><em>The Dark Knight</em></a>' },
  ],
  m4c: [ // nesting — builds on p, headings from m1-2
    { instruction: "Write a paragraph with a breaking news alert where the headline is both bold and italic", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<strong>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/strong>/i.test(v), answer: "<p><strong><em>BREAKING:</em></strong> Scientists discover life on Europa.</p>" },
    { instruction: "Write an h2 then a paragraph where the most important phrase is bold and italic", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<strong>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/strong>/i.test(v), answer: "<h2>Limited Offer</h2><p>This deal is <strong><em>absolutely insane</em></strong> — do not miss it.</p>" },
  ],
  m4d: [ // br/hr — builds on headings, paragraphs, lists from m1-3
    { instruction: "Write a heading, a paragraph, then an hr divider, then another paragraph", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<hr/i.test(v) && (v.match(/<p>/gi) || []).length >= 2, answer: "<h2>Chapter One</h2><p>The adventure begins.</p><hr><p>Little did they know...</p>" },
    { instruction: "Write an address block — name, br, street, br, city — all in one paragraph", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && (v.match(/<br/gi) || []).length >= 2, answer: "<p>John Smith<br>123 Main Street<br>Houston TX</p>" },
  ],
  m5a: [ // div — builds on headings, paragraphs, lists, links from m1-4
    { instruction: ["Defrag the cargo hold!", "Write a <div> wrapper", "Inside add an <h2> heading with a title", "Add a <p> paragraph preview", "Add an <a> link that says: Read More"], check: (v) => /<div>[\s\S]*<\/div>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<a[\s\S]*<\/a>/i.test(v), answer: '<div><h2>5 Tips for Better Sleep</h2><p>Sleep experts reveal the secrets to waking up refreshed.</p><a href="#">Read More</a></div>' },
    { instruction: ["Reroute ship power!", "Write a <div> wrapper", "Inside add an <h2> product name", "Add a <p> description", "Add a <ul> with 3 feature <li> items"], check: (v) => /<div>[\s\S]*<\/div>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<div><h2>AirPods Pro</h2><p>The best wireless earbuds ever made.</p><ul><li>Noise cancellation</li><li>30hr battery</li><li>Spatial audio</li></ul></div>" },
  ],
  m5b: [ // span — builds on paragraphs, bold, italic from m1-4
    { instruction: ["Scan the data stream!", "Write a <p> about stocks", "Wrap the price in a <span>", "Make the word UP bold with <strong>"], check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<span>[\s\S]*<\/span>/i.test(v) && /<strong>[\s\S]*up[\s\S]*<\/strong>/i.test(v), answer: "<p>Tesla is at <span>$248.50</span> — <strong>UP</strong> 3% today.</p>" },
    { instruction: ["Calibrate the sensors!", "Write a <p> about a recipe", "Wrap the temperature in a <span>", "Make the dish name italic with <em>"], check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<span>[\s\S]*<\/span>/i.test(v) && /<em>[\s\S]*<\/em>/i.test(v), answer: "<p>Bake your <em>lasagna</em> at <span>375°F</span> for 45 minutes.</p>" },
  ],
  m5c: [ // semantic layout — builds on headings, paragraphs, links, lists from m1-4
    { instruction: ["Seal the lower decks!", "Write a <footer>", "Inside add a <ul> with 3 <a> links", "Add a <p> with copyright text"], check: (v) => /<footer>[\s\S]*<\/footer>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<footer><ul><li><a href='#'>About</a></li><li><a href='#'>Contact</a></li><li><a href='#'>Privacy</a></li></ul><p>© 2026 NewsHQ</p></footer>" },
    { instruction: ["Activate the bridge!", "Write a <header>", "Inside add an <h1> with the site name", "Add a paragraph with a short site description"], check: (v) => /<header>[\s\S]*<\/header>/i.test(v) && /<h1>[\s\S]*<\/h1>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v), answer: "<header><h1>CoolSite</h1><p>The best site on the internet.</p></header>" },
  ],
  m5d: [ // full layout — builds on everything from m1-5
    { instruction: ["Full hull diagnostic!", "Write a <header> with an <h1> name and a paragraph tagline", "Write a <main> with an <h2> and <p> description", "Write a <footer> with opening hours"], check: (v) => /<header>[\s\S]*<\/header>/i.test(v) && /<main>[\s\S]*<\/main>/i.test(v) && /<footer>[\s\S]*<\/footer>/i.test(v), answer: "<header><h1>Taco Palace</h1><p>Fresh tacos since 2010</p></header><main><h2>Our Menu</h2><p>Made fresh daily.</p></main><footer><p>Open Mon-Sun 11am-10pm</p></footer>" },
    { instruction: ["Deploy the portfolio module!", "Write a <main>", "Inside add an <h2> and a <p> about yourself", "Add a <ul> with 3 skill <li> items"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<main><h2>About Me</h2><p>Web developer based in Houston TX.</p><ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul></main>" },
  ],
  m6a: [ // form — builds on headings, paragraphs, buttons from m1-5
    { instruction: ["Initiate job protocol!", "Write a <form>", "Inside add an <h2> and a <p> description", "Add a <button> that says: Apply Now"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<button>[\s\S]*<\/button>/i.test(v), answer: "<form><h2>Join Our Team</h2><p>Fill out the form below to apply.</p><button>Apply Now</button></form>" },
    { instruction: ["Open comms channel!", "Write a <main> containing a <form>", "Inside the form add an <h2>", "Add a <button> that says: Send Message"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<form>[\s\S]*<\/form>/i.test(v), answer: "<main><form><h2>Contact Us</h2><button>Send Message</button></form></main>" },
  ],
  m6b: [ // input — builds on forms, headings, buttons from m1-6a
    { instruction: ["Register new crew member!", "Write a <form> with an <h2>", "Add an <input type='text'> for name", "Add an <input type='email'> for email", "Add a <button type='submit'>"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<input[^>]*type="text"[^>]*>/i.test(v) && /<input[^>]*type="email"[^>]*>/i.test(v) && /<button/i.test(v), answer: '<form><h2>Sign Up</h2><input type="text" placeholder="Full name"><input type="email" placeholder="Email"><button type="submit">Join</button></form>' },
    { instruction: ["Reboot security systems!", "Write an <input type='email'> for the email", "Add an <input type='password'> for new password", "Add another <input type='password'> to confirm"], check: (v) => /<input[^>]*type="email"[^>]*>[\s\S]*<input[^>]*type="password"[^>]*>[\s\S]*<input[^>]*type="password"[^>]*>/i.test(v), answer: '<input type="email" placeholder="Your email"><input type="password" placeholder="New password"><input type="password" placeholder="Confirm password">' },
  ],
  m6c: [ // label+input — builds on forms, headings, buttons from m1-6b
    { instruction: ["Access the mainframe!", "Write a <label> and <input type='email'> for email", "Write a <label> and <input type='password'> for password", "Add a <button type='submit'> to log in"], check: (v) => /<label[^>]*for="[\w-]+"[^>]*>[\s\S]*<\/label>[\s\S]*<input[^>]*id="[\w-]+"[\s\S]*<label[^>]*for="[\w-]+"[^>]*>[\s\S]*<\/label>[\s\S]*<input[^>]*id="[\w-]+"[\s\S]*<button/i.test(v), answer: '<label for="email">Email</label><input id="email" type="email"><label for="pass">Password</label><input id="pass" type="password"><button type="submit">Log In</button>' },
    { instruction: ["Register alien crew!", "Write a <label> and <input type='text'> for name", "Write a <label> and <input type='date'> for birthday"], check: (v) => /<label[\s\S]*<\/label>[\s\S]*<input[\s\S]*<label[\s\S]*<\/label>[\s\S]*<input[^>]*type="date"[^>]*>/i.test(v), answer: '<label for="name">Your Name</label><input id="name" type="text"><label for="bday">Birthday</label><input id="bday" type="date">' },
  ],
  m7a: [ // select — builds on labels, forms, headings, buttons from m1-6c
    { instruction: ["Configure the food replicator!", "Write a <form>", "Add a <label> and <select> with Small, Medium, Large <option> items", "Add a <button type='submit'> to order"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<label[\s\S]*<\/label>/i.test(v) && /<select>[\s\S]*<\/select>/i.test(v) && /<button/i.test(v), answer: '<form><label for="size">Size:</label><select id="size"><option>Small</option><option>Medium</option><option>Large</option></select><button type="submit">Order</button></form>' },
    { instruction: ["Calibrate ship settings!", "Write a <label> and <select> for language with English and Spanish <option> items", "Write a <label> and <select> for theme with Light and Dark <option> items"], check: (v) => /<select>[\s\S]*<\/select>[\s\S]*<select>[\s\S]*<\/select>/i.test(v), answer: '<label for="lang">Language</label><select id="lang"><option>English</option><option>Spanish</option></select><label for="theme">Theme</label><select id="theme"><option>Light</option><option>Dark</option></select>' },
  ],
  m7b: [ // textarea — builds on labels, forms, headings, buttons from m1-7a
    { instruction: ["Open a support channel!", "Write a <form> with an <h2>", "Add a <label> and <textarea> for the issue", "Add a <button type='submit'>"], check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<label[\s\S]*<\/label>/i.test(v) && /<textarea[\s\S]*<\/textarea>/i.test(v) && /<button/i.test(v), answer: '<h2>Submit a Ticket</h2><label for="issue">Describe your issue:</label><textarea id="issue" placeholder="What went wrong?"></textarea><button type="submit">Submit</button>' },
    { instruction: ["Transmit crew feedback!", "Write a <label> and <input type='text'> for name", "Write a <label> and <textarea> for the review", "Add a <button type='submit'>"], check: (v) => /<input[^>]*type="text"[^>]*>/i.test(v) && /<textarea[\s\S]*<\/textarea>/i.test(v) && /<button/i.test(v), answer: '<label for="name">Your Name</label><input id="name" type="text"><label for="review">Your Review</label><textarea id="review" placeholder="Share your thoughts"></textarea><button type="submit">Post Review</button>' },
  ],
  m7c: [ // submit — builds on complete forms from m1-7b
    { instruction: ["Broadcast to the fleet!", "Write a <form>", "Add a <label> and <input type='email'>", "Add a <button type='submit'> that says: Join 50,000 Subscribers"], check: (v) => /<label[\s\S]*<\/label>/i.test(v) && /<input[^>]*type="email"[^>]*>/i.test(v) && /<button[^>]*type="submit"[^>]*>[\s\S]*<\/button>/i.test(v), answer: '<form><label for="email">Email</label><input id="email" type="email" placeholder="you@email.com"><button type="submit">Join 50,000 Subscribers</button></form>' },
    { instruction: ["Fund the rescue mission!", "Write a <label> and <input type='number'> for amount", "Add a <label> and <select> with One-time and Monthly <option> items", "Add a <button type='submit'> that says: Donate Now"], check: (v) => /<input[^>]*type="number"[^>]*>/i.test(v) && /<select>[\s\S]*<\/select>/i.test(v) && /<button[^>]*type="submit"[^>]*>/i.test(v), answer: '<label for="amount">Amount ($)</label><input id="amount" type="number" placeholder="25"><label for="freq">Frequency</label><select id="freq"><option>One-time</option><option>Monthly</option></select><button type="submit">Donate Now</button>' },
  ],
  m8a: [ // table tr td — builds on headings, semantic layout from m1-7
    { instruction: ["Initialize the scoreboard!", "Write an <h2> that says: Leaderboard", "Write a <table> with one <tr> row", "Inside add two <td> cells for name and score"], check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && (v.match(/<td>/gi) || []).length >= 2, answer: "<h2>Leaderboard</h2><table><tr><td>SpaceAce</td><td>99,400</td></tr></table>" },
    { instruction: ["Access the film archive!", "Write a <main>", "Inside add a <table>", "Add 2 <tr> rows each with two <td> cells for movie title and year"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && (v.match(/<tr>/gi) || []).length >= 2, answer: "<main><table><tr><td>Inception</td><td>2010</td></tr><tr><td>Parasite</td><td>2019</td></tr></table></main>" },
  ],
  m8b: [ // th headers — builds on full tables, semantic layout from m1-8a
    { instruction: ["Upload the schedule matrix!", "Write a <table>", "Add a header <tr> with three <th> cells: Time, Subject, Room", "Add 2 data <tr> rows with three <td> cells each"], check: (v) => /<table>[\s\S]*<\/table>/i.test(v) && /time/i.test(v) && (v.match(/<th>/gi) || []).length >= 3 && /<td>/i.test(v), answer: "<table><tr><th>Time</th><th>Subject</th><th>Room</th></tr><tr><td>9am</td><td>HTML</td><td>Lab 3</td></tr><tr><td>11am</td><td>CSS</td><td>Lab 4</td></tr></table>" },
    { instruction: ["Deploy the pricing matrix!", "Write a <main> with an <h2>", "Write a <table> with header <th> cells: Plan and Price", "Add 2 data <tr> rows with <td> cells"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && /<th>/i.test(v), answer: "<main><h2>Our Plans</h2><table><tr><th>Plan</th><th>Price</th></tr><tr><td>Free</td><td>$0</td></tr><tr><td>Pro</td><td>$12/mo</td></tr></table></main>" },
  ],
  m8c: [ // full tables — builds on everything from m1-8b
    { instruction: ["Reconstruct the recipe database!", "Write a <header> with the recipe name", "Write a <main> with a <table> — headers: Ingredient and Amount — with 3 data rows", "Add an <ol> with numbered cooking steps"], check: (v) => /<table>[\s\S]*<\/table>/i.test(v) && /<th>/i.test(v) && /<ol>[\s\S]*<\/ol>/i.test(v), answer: "<header><h1>Classic Carbonara</h1></header><main><table><tr><th>Ingredient</th><th>Amount</th></tr><tr><td>Pasta</td><td>200g</td></tr><tr><td>Eggs</td><td>3</td></tr><tr><td>Pancetta</td><td>100g</td></tr></table><ol><li>Boil pasta</li><li>Fry pancetta</li><li>Mix and serve</li></ol></main>" },
  ],
  m9a: [ // article — builds on headings, paragraphs, lists, bold/italic from m1-8
    { instruction: ["Intercept the product signal!", "Write an <article>", "Inside add an <h2> title and <p> description", "Add a <ul> with 3 feature <li> items"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<article><h2>iPhone 17 Announced</h2><p>Apple unveiled its most powerful iPhone yet.</p><ul><li>A19 chip</li><li>48MP camera</li><li>All-day battery</li></ul></article>" },
    { instruction: ["Decode the news broadcast!", "Write an <article> with an <h2> and <p>", "Make a key phrase in the paragraph <strong>", "Add an <aside> with a related fact paragraph"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v) && /<aside>[\s\S]*<\/aside>/i.test(v), answer: "<article><h2>Climate Report</h2><p>Scientists warn of <strong>record temperatures</strong> ahead.</p></article><aside><p>Fact: 2025 was the hottest year ever recorded.</p></aside>" },
  ],
  m9b: [ // section — builds on semantic layout, headings, paragraphs, lists from m1-9a
    { instruction: ["Triangulate dual signals!", "Write a <section> for About with an <h2> and <p>", "Write a second <section> for Services with an <h2> and <ul> of 3 items"], check: (v) => (v.match(/<section>/gi) || []).length >= 2 && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<section><h2>About</h2><p>We build amazing websites.</p></section><section><h2>Services</h2><ul><li>Design</li><li>Development</li><li>SEO</li></ul></section>" },
    { instruction: ["Activate dual beam array!", "Write a <main>", "Inside add a hero <section> with an <h1> and <p>", "Add a features <section> with an <h2> and <ul> of 3 <li> items"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && (v.match(/<section>/gi) || []).length >= 2 && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<main><section><h1>Build Faster</h1><p>The tool developers love.</p></section><section><h2>Features</h2><ul><li>Fast</li><li>Reliable</li><li>Beautiful</li></ul></section></main>" },
  ],
  m9c: [ // aside — builds on articles, sections, semantic layout from m1-9b
    { instruction: ["Scan the nutrition database!", "Write an <article> with an <h2> and <p>", "Add an <aside> with a fact where the key number is <strong>"], check: (v) => /<aside>[\s\S]*<\/aside>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v), answer: "<article><h2>Eat More Vegetables</h2><p>Experts recommend 5 servings of vegetables per day.</p></article><aside><p>Fact: <strong>90%</strong> of Americans do not eat enough vegetables.</p></aside>" },
    { instruction: ["Access the cooking module!", "Write a <main>", "Inside add a <section> with an <h2> and <p>", "Add an <aside> with a cooking tip paragraph"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<section>[\s\S]*<\/section>/i.test(v) && /<aside>[\s\S]*<\/aside>/i.test(v), answer: "<main><section><h2>Spaghetti Bolognese</h2><p>A classic Italian comfort food.</p></section><aside><p>Tip: Always salt your pasta water generously.</p></aside></main>" },
  ],
  m9d: [ // figure+figcaption — builds on articles, sections, images from m1-9c
    { instruction: ["Deploy the visual sensors!", "Write an <article> with an <h2>", "Add a <figure> with an <img> and descriptive <figcaption>", "Add a <p> about the topic"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<figure>[\s\S]*<\/figure>/i.test(v) && /<figcaption>[\s\S]*<\/figcaption>/i.test(v), answer: '<article><h2>Capturing the Wild</h2><figure><img src="lion.jpg" alt="A lion resting in tall savanna grass at sunset"><figcaption>A male lion at sunset in the Serengeti</figcaption></figure><p>Wildlife photography requires patience and skill.</p></article>' },
    { instruction: ["Scan two planetary surfaces!", "Write a <main>", "Add a <figure> with <img> and <figcaption> for one city", "Add a second <figure> with <img> and <figcaption> for another city"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && (v.match(/<figure>/gi) || []).length >= 2 && (v.match(/<figcaption>/gi) || []).length >= 2, answer: '<main><figure><img src="tokyo.jpg" alt="Tokyo skyline at night"><figcaption>Tokyo, Japan</figcaption></figure><figure><img src="nyc.jpg" alt="New York City from Central Park"><figcaption>New York City, USA</figcaption></figure></main>' },
  ],
  m10a: [ // video — builds on figures, sections, articles, headings from m1-9d
    { instruction: ["Restore the holographic archive!", "Write an <article> with an <h2>", "Add a <figure> containing a <video> with controls", "Add a <p> about the film"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<video[\s\S]*<\/video>/i.test(v) && /controls/i.test(v), answer: '<article><h2>Short Film: Lost Signal</h2><figure><video src="film.mp4" controls></video><figcaption>Watch the full short film</figcaption></figure><p>Directed by emerging filmmaker Zara Kim.</p></article>' },
    { instruction: ["Boot the hero projection!", "Write a <section> with an <h1>", "Add a <video> with autoplay loop and muted attributes", "Add a <p> tagline below the video"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<video[\s\S]*<\/video>/i.test(v) && /autoplay/i.test(v) && /muted/i.test(v), answer: '<section><h1>Welcome to the Future</h1><video src="hero.mp4" autoplay loop muted></video><p>Technology that changes everything.</p></section>' },
  ],
  m10b: [ // audio — builds on articles, figures, sections from m1-10a
    { instruction: ["Tune the audio receiver!", "Write a <section> with an <h2>", "Add an <audio> player with controls", "Add a <p> describing the episode"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<audio[\s\S]*<\/audio>/i.test(v) && /controls/i.test(v), answer: '<section><h2>Episode 42: The Future of AI</h2><audio src="ep42.mp3" controls></audio><p>In this episode we explore how AI is reshaping every industry.</p></section>' },
    { instruction: ["Review the transmission log!", "Write an <article> with an <h2> where the album title is <em>", "Add an <audio> preview with controls", "Add a <p> review where the rating is <strong>"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<audio[\s\S]*<\/audio>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v), answer: '<article><h2><em>Utopia</em> by Travis Scott</h2><audio src="preview.mp3" controls></audio><p>A genre-defining masterpiece. Rating: <strong>9.5/10</strong></p></article>' },
  ],
  m10c: [ // iframe — builds on sections, headings, paragraphs, figures from m1-10b
    { instruction: ["Open the navigation window!", "Write a <section> with an <h2>", "Add a <p> with the address", "Embed a Google Map using an <iframe>"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<iframe[\s\S]*<\/iframe>/i.test(v), answer: '<section><h2>Find Us</h2><p>123 Main Street, Houston TX</p><iframe src="https://maps.google.com/embed" width="600" height="450"></iframe></section>' },
    { instruction: ["Stream the training signal!", "Write an <h2> for the tutorial title", "Embed a YouTube video using an <iframe>", "Add a <ul> with 3 <li> items covering what the video teaches"], check: (v) => /<iframe[\s\S]*youtube[\s\S]*<\/iframe>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: '<h2>HTML Crash Course</h2><iframe src="https://youtube.com/embed/abc" width="560" height="315"></iframe><ul><li>How to write tags</li><li>Building forms</li><li>Semantic layout</li></ul>' },
  ],

  m11a: [
    { instruction: "Write a page shell for a pizza website — DOCTYPE, html, head, and body", check: (v) => /<!doctype html>/i.test(v) && /<html/i.test(v) && /<head>/i.test(v) && /<body>/i.test(v), answer: "<!DOCTYPE html><html><head></head><body></body></html>" },
    { instruction: "Write a page shell for your personal portfolio", check: (v) => /<!doctype html>/i.test(v) && /<html/i.test(v) && /<\/html>/i.test(v), answer: "<!DOCTYPE html><html><head></head><body></body></html>" },
  ],
  m11b: [
    { instruction: "Write the charset meta tag that handles every language on Earth", check: (v) => /<meta[^>]*charset="utf-8"[^>]*>/i.test(v), answer: '<meta charset="UTF-8">' },
    { instruction: "Write the charset meta tag for a website that needs to display Chinese characters", check: (v) => /<meta[^>]*charset="utf-8"[^>]*>/i.test(v), answer: '<meta charset="UTF-8">' },
  ],
  m11c: [
    { instruction: "Write a viewport meta tag for a mobile cooking app", check: (v) => /<meta[^>]*name="viewport"[^>]*>/i.test(v) && /device-width/i.test(v), answer: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
    { instruction: "Write a description meta tag for a travel blog about Japan", check: (v) => /<meta[^>]*name="description"[^>]*>/i.test(v) && /japan/i.test(v), answer: '<meta name="description" content="A travel blog about exploring Japan">' },
  ],
  m11d: [
    { instruction: "Write a title tag for a coffee shop called The Daily Grind", check: (v) => /<title>[\s\S]*daily grind[\s\S]*<\/title>/i.test(v), answer: "<title>The Daily Grind Coffee Shop</title>" },
    { instruction: "Write a title tag for a YouTube-style video about cooking pasta", check: (v) => /<title>[\s\S]*<\/title>/i.test(v) && /pasta|cook/i.test(v), answer: "<title>How to Cook Perfect Pasta Every Time</title>" },
  ],
  m12a: [
    { instruction: 'Write an image of a sunset with src="sunset.jpg" and a vivid descriptive alt', check: (v) => /<img[^>]*src="sunset\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v) || /<img[^>]*alt="[^"]{10,}"[^>]*src="sunset\.jpg"[^>]*>/i.test(v), answer: '<img src="sunset.jpg" alt="A vibrant orange and pink sunset over a calm ocean">' },
    { instruction: "Write an image of your favorite food with a mouthwatering alt description", check: (v) => /<img[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="pizza.jpg" alt="A hot pepperoni pizza fresh out of the oven with melted cheese">' },
  ],
  m12b: [
    { instruction: 'Write a button with aria-label: Close dialog that shows an X', check: (v) => /<button[^>]*aria-label="close dialog"[^>]*>/i.test(v), answer: '<button aria-label="Close dialog">X</button>' },
    { instruction: 'Write a button with aria-label: Search the website that shows the text: Search', check: (v) => /<button[^>]*aria-label="search the website"[^>]*>/i.test(v), answer: '<button aria-label="Search the website">Search</button>' },
  ],
  m12c: [
    { instruction: 'Write a div with role="status" containing: Saving your progress', check: (v) => /<div[^>]*role="status"[^>]*>[\s\S]*saving[\s\S]*<\/div>/i.test(v), answer: '<div role="status">Saving your progress</div>' },
    { instruction: 'Write a div with role="alert" containing: Connection lost please try again', check: (v) => /<div[^>]*role="alert"[^>]*>[\s\S]*connection lost[\s\S]*<\/div>/i.test(v), answer: '<div role="alert">Connection lost please try again</div>' },
  ],

  m13a: [
    { instruction: "Write a comment explaining what the next section of code does — pretend it is a navigation menu", check: (v) => /<!--[\s\S]*nav[\s\S]*-->/.test(v.toLowerCase()), answer: "<!-- Navigation menu goes here -->" },
    { instruction: "Write a comment with a reminder to yourself: Add contact form here later", check: (v) => /<!--[\s\S]*contact[\s\S]*-->/.test(v.toLowerCase()), answer: "<!-- Add contact form here later -->" },
  ],
  m13b: [
    { instruction: "Comment out this old heading to disable it: <h1>Old Title</h1>", check: (v) => /<!--[\s\S]*<h1>[\s\S]*old title[\s\S]*<\/h1>[\s\S]*-->/i.test(v), answer: "<!-- <h1>Old Title</h1> -->" },
    { instruction: "Comment out this paragraph to hide it: <p>Coming soon</p>", check: (v) => /<!--[\s\S]*<p>[\s\S]*coming soon[\s\S]*<\/p>[\s\S]*-->/i.test(v), answer: "<!-- <p>Coming soon</p> -->" },
  ],
  m13c: [
    { instruction: "Write a paragraph that shows: Coffee & Tea using &amp; for the ampersand", check: (v) => /<p>[\s\S]*coffee[\s\S]*&amp;[\s\S]*tea[\s\S]*<\/p>/i.test(v), answer: "<p>Coffee &amp; Tea</p>" },
    { instruction: "Write a paragraph showing the copyright notice: Copyright &copy; 2026 SignalLost", check: (v) => /<p>[\s\S]*&copy;[\s\S]*<\/p>/i.test(v), answer: "<p>Copyright &copy; 2026 SignalLost</p>" },
    { instruction: "Write a paragraph that shows HTML code as text: The &lt;p&gt; tag is for paragraphs", check: (v) => /<p>[\s\S]*&lt;p&gt;[\s\S]*<\/p>/i.test(v) || /<p>[\s\S]*&lt;p[\s\S]*<\/p>/i.test(v), answer: "<p>The &lt;p&gt; tag is for paragraphs</p>" },
  ],
  m14a: [
    { instruction: "Write a paragraph that says: Warning — with style making the text red", check: (v) => /<p[^>]*style="[^"]*color:\s*red[^"]*"[^>]*>/i.test(v), answer: '<p style="color: red;">Warning</p>' },
    { instruction: "Write an h2 that says: Success — with style making the text green", check: (v) => /<h2[^>]*style="[^"]*color:\s*green[^"]*"[^>]*>/i.test(v), answer: '<h2 style="color: green;">Success</h2>' },
    { instruction: "Write a paragraph with any text and style making the background-color yellow", check: (v) => /<p[^>]*style="[^"]*background-color:\s*yellow[^"]*"[^>]*>/i.test(v), answer: '<p style="background-color: yellow;">Highlighted text</p>' },
  ],
  m14b: [
    { instruction: "Write an h1 with style setting font-size to 48px and text-align to center", check: (v) => /<h1[^>]*style="[^"]*font-size:\s*48px[^"]*"[^>]*>/i.test(v) && /text-align:\s*center/i.test(v), answer: '<h1 style="font-size: 48px; text-align: center;">Signal Lost</h1>' },
    { instruction: "Write a button with style making it have a green background and white text", check: (v) => /<button[^>]*style="[^"]*background-color:\s*green[^"]*"[^>]*>/i.test(v) && /color:\s*white/i.test(v), answer: '<button style="background-color: green; color: white;">Click Me</button>' },
  ],
  m14c: [
    { instruction: "Write a link tag connecting a stylesheet called: app.css", check: (v) => /<link[^>]*rel="stylesheet"[^>]*href="app\.css"[^>]*>/i.test(v) || /<link[^>]*href="app\.css"[^>]*rel="stylesheet"[^>]*>/i.test(v), answer: '<link rel="stylesheet" href="app.css">' },
    { instruction: "Write a full page head section with charset meta, viewport meta, title, and a link to style.css", check: (v) => /<head>[\s\S]*<meta[^>]*charset[\s\S]*<meta[^>]*viewport[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<link[^>]*stylesheet[\s\S]*<\/head>/i.test(v), answer: '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Page</title><link rel="stylesheet" href="style.css"></head>' },
  ],

};

const MIN_DRILLS = 2; // minimum reps before Move On unlocks

export { DRILLS, MIN_DRILLS };
