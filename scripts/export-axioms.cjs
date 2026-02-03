const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const NOTES_PATH = 'O:\\_Theophysics\\_001-188';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'axioms.json');

function parseAxiom(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);
    
    // Extract title from first heading
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/\[\[.*?\|(.+?)\]\]/, '$1') : path.basename(filePath, '.md');
    
    // Extract sections
    const sections = {};
    const lines = markdown.split('\n');
    let currentSection = '';
    let currentContent = [];
    
    for (const line of lines) {
      if (line.match(/^##\s+(.+)$/)) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n').trim();
        }
        currentSection = line.replace(/^##\s+/, '');
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    }
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n').trim();
    }
    
    return {
      id: data.axiom_id || path.basename(filePath, '.md').split('_')[1],
      chainPosition: data.chain_position || 0,
      fileName: path.basename(filePath),
      title: title,
      classification: data.classification || '',
      stage: data.stage || 1,
      status: data.status || '',
      domain: data.domain || [],
      dependsOn: data.depends_on || [],
      enables: data.enables || [],
      frontmatter: data,
      sections: sections,
      fullContent: markdown
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

function exportAxioms() {
  console.log('Reading axioms from:', NOTES_PATH);
  
  const files = fs.readdirSync(NOTES_PATH);
  const axioms = [];
  
  for (const file of files) {
    if (file.match(/^\d{3}_.*\.md$/)) {
      const filePath = path.join(NOTES_PATH, file);
      const axiom = parseAxiom(filePath);
      if (axiom) {
        axioms.push(axiom);
      }
    }
  }
  
  // Sort by chain position
  axioms.sort((a, b) => a.chainPosition - b.chainPosition);
  
  // Create data directory if it doesn't exist
  const dataDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Write to file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(axioms, null, 2));
  
  console.log(`✓ Exported ${axioms.length} axioms to ${OUTPUT_PATH}`);
  console.log(`  First: ${axioms[0].id} - ${axioms[0].title}`);
  console.log(`  Last: ${axioms[axioms.length - 1].id} - ${axioms[axioms.length - 1].title}`);
}

exportAxioms();
