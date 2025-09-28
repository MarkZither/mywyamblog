const fs = require('fs');
const path = require('path');

/**
 * Fix malformed YAML frontmatter in already migrated files
 */

const BLOG_DIR = './blog';

function fixYamlFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
        return; // No frontmatter to fix
    }
    
    const [, frontmatter, markdownContent] = frontmatterMatch;
    
    // Check if it has old Statiq-style frontmatter that needs fixing
    const hasOldFormat = frontmatter.includes('Title:') || frontmatter.includes('Published:') || frontmatter.includes('Tags:');
    
    if (!hasOldFormat) {
        return; // Already in correct format
    }
    
    console.log(`Fixing YAML frontmatter in ${path.basename(filePath)}...`);
    
    // Parse the old frontmatter
    const lines = frontmatter.split('\n');
    const metadata = {};
    
    lines.forEach(line => {
        const titleMatch = line.match(/^Title:\s*(.+)$/);
        const publishedMatch = line.match(/^Published:\s*(.+)$/);
        const tagsMatch = line.match(/^Tags:\s*(.+)$/);
        
        if (titleMatch) {
            metadata.title = titleMatch[1].trim();
        } else if (publishedMatch) {
            metadata.date = publishedMatch[1].trim();
        } else if (tagsMatch) {
            // Handle malformed inline list syntax like "Tags:  - Item1  - Item2  - Item3"
            let tagsValue = tagsMatch[1].trim();
            if (tagsValue.includes(' - ')) {
                const tagItems = tagsValue.split(' - ').map(item => item.trim()).filter(item => item);
                // Remove leading dash from first item if present
                if (tagItems[0] && tagItems[0].startsWith('-')) {
                    tagItems[0] = tagItems[0].substring(1).trim();
                }
                metadata.tags = tagItems;
            } else {
                // Handle other tag formats
                metadata.tags = [tagsValue];
            }
        }
    });
    
    // Build new Docusaurus frontmatter
    const newFrontmatter = [
        `title: "${metadata.title || 'Untitled'}"`,
        `authors: ["mark-burton"]`,
        `tags: [${(metadata.tags || []).map(tag => `"${tag}"`).join(', ')}]`,
        `date: "${metadata.date || '2020-01-01'}"`
    ].join('\n');
    
    // Write the fixed file
    const newContent = `---\n${newFrontmatter}\n---\n\n${markdownContent}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✅ Fixed ${path.basename(filePath)}`);
}

function main() {
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`Blog directory ${BLOG_DIR} not found`);
        return;
    }
    
    const files = fs.readdirSync(BLOG_DIR)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(BLOG_DIR, file));
    
    console.log(`Found ${files.length} blog files to check`);
    
    let fixedCount = 0;
    files.forEach(file => {
        try {
            const beforeContent = fs.readFileSync(file, 'utf8');
            fixYamlFrontmatter(file);
            const afterContent = fs.readFileSync(file, 'utf8');
            if (beforeContent !== afterContent) {
                fixedCount++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\n🎉 YAML frontmatter fix complete!`);
    console.log(`📝 Fixed ${fixedCount} files with malformed YAML`);
}

if (require.main === module) {
    main();
}