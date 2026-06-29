const FREESTYLE_TEMPLATES = [
  { label: "Blank", code: "" },
  { label: "Basic Page", code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>Start coding here...</p>\n  </body>\n</html>` },
  { label: "Form", code: `<form>\n  <label for="name">Name:</label>\n  <input id="name" type="text" placeholder="Your name">\n\n  <label for="email">Email:</label>\n  <input id="email" type="email" placeholder="Your email">\n\n  <button type="submit">Submit</button>\n</form>` },
  { label: "Table", code: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n  </tr>\n  <tr>\n    <td>Commander Zyx</td>\n    <td>Pilot</td>\n  </tr>\n</table>` },
  { label: "Article", code: `<article>\n  <h2>Mission Report</h2>\n  <p>All systems nominal.</p>\n  <aside>\n    <p>Fun fact: Sector 7 has 3 moons.</p>\n  </aside>\n</article>` },
];

export { FREESTYLE_TEMPLATES };
