import fs from 'fs'
import path from 'path'

const htmlPath = 'html/single.html'
const cssDir = 'html/css'

if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found:', htmlPath)
  process.exit(1)
}

if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true })
}

let htmlContent = fs.readFileSync(htmlPath, 'utf-8')

// Regex to capture style tags
// Group 1: Attributes (e.g. ' id="foo" type="text/css"')
// Group 2: Content
const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi

let count = 0
let replacements = []

// We use a replace loop to find all matches and build replacements list
// We don't modify htmlContent inside the match loop to avoid index issues if we were doing it manually,
// but String.replace with callback is safe.

const newHtmlContent = htmlContent.replace(styleRegex, (match, attributes, content) => {
  count++
  const filename = `style-${String(count).padStart(3, '0')}.css`
  const filePath = path.join(cssDir, filename)

  // Fix URLs in CSS content
  // The HTML is in html/, images in html/images/
  // The CSS will be in html/css/
  // So 'images/foo.png' in HTML context becomes '../images/foo.png' in CSS file context.

  // Regex covers: url("images/...), url('images/...), url(images/...)
  // We capture the quote (or empty) in group 1
  let fixedContent = content.replace(/url\((['"]?)images\//g, 'url($1../images/')

  fs.writeFileSync(filePath, fixedContent, 'utf-8')
  console.log(`Extracted style ${count} to ${filePath}`)

  // Clean attributes: remove distinct newlines or excessive spaces if any, though usually they are fine.
  // We need to keep attributes like 'media', 'id'.
  // Construct link tag.
  // Note: <link> is void element.

  // Check if attributes contain 'type="text/css"' or similar?
  // Browsers default to text/css for stylesheet links, so mostly fine.

  // If the style tag had attributes, we try to preserve them.
  // However, 'scoped' attribute is deprecated/removed.
  // 'data-emotion' etc should be preserved? Yes, maybe used by JS.

  return `<link rel="stylesheet" href="css/${filename}"${attributes}>`
})

fs.writeFileSync(htmlPath, newHtmlContent, 'utf-8')
console.log(`Extracted ${count} style tags to external CSS files.`)
