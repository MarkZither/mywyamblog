#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Migration script to convert Statiq blog posts to Docusaurus format
 * This script helps migrate markdown files from Statiq to Docusaurus blog format
 */

const STATIQ_POSTS_DIR = '../blog/input/posts';
const DOCUSAURUS_BLOG_DIR = './blog';

/**
 * Helper function to apply transformations while preserving code blocks
 */
function processContentPreservingCodeBlocks(content, transformFn) {
    const codeBlocks = [];
    let placeholder = 0;
    
    // Step 1: Extract and replace code blocks with placeholders
    const contentWithPlaceholders = content.replace(/```[\s\S]*?```/g, (match) => {
        const placeholderText = `__CODEBLOCK_PLACEHOLDER_${placeholder}__`;
        codeBlocks[placeholder] = match;
        placeholder++;
        return placeholderText;
    });
    
    // Step 2: Apply transformations to content without code blocks
    const transformedContent = transformFn(contentWithPlaceholders);
    
    // Step 3: Restore code blocks
    return transformedContent.replace(/__CODEBLOCK_PLACEHOLDER_(\d+)__/g, (match, index) => {
        return codeBlocks[parseInt(index)] || match;
    });
}

/**
 * Apply content transformations to fix Statiq-specific syntax for Docusaurus/MDX compatibility
 */
function applyContentTransformations(content) {
    return content
        // Fix image paths from various formats to /img/
        // Handle images with empty alt text too
        .replace(/(\!\[\]\()\.\.\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[\]\()\.\.\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[\]\()\.\.\/assets\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\//g, '$1/img/')
        
        // Handle images with alt text
        .replace(/(\!\[.*?\]\()\.\.\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\/assets\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\//g, '$1/img/')
        
        // Handle Windows-style paths
        .replace(/(\!\[.*?\]\()\.\.\\assets\\Images\\/g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\\assets\\images\\/g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\\assets\\/g, '$1/img/')
        
        // Fix /img/Images to /img/ 
        .replace(/(\!\[.*?\]\()\/img\/Images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/img\/images\//g, '$1/img/')
        
        // Fix malformed image paths that are missing slashes
        .replace(/(\!\[.*?\]\()img([^\/])/g, '$1/img/$2')
        .replace(/(\!\[.*?\]\()\/img([^\/])/g, '$1/img/$2')
        
        // Fix image paths with multiple slashes or incorrect formats
        .replace(/(\!\[.*?\]\()([^\/][^)]*?\.(png|jpg|jpeg|gif|svg))/gi, '$1/img/$2')
        
        // Specifically handle imgXXX.extension patterns that didn't get caught
        .replace(/(\!\[.*?\]\()img([A-Za-z0-9_\-\.]*?\.(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))/g, '$1/img/$2')
        
        // Most direct approach - fix any ![](imgXXX) patterns
        .replace(/!\[\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![](/img/$1)')
        .replace(/!\[([^\]]*)\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![$1](/img/$2)')
        
        // Handle video and other media source paths
        .replace(/(src=["'])\.\.\/assets\//g, '$1/img/')
        .replace(/(src=["'])\/assets\//g, '$1/img/')
        .replace(/(href=["'])\.\.\/assets\//g, '$1/img/')
        .replace(/(href=["'])\/assets\//g, '$1/img/')
        
        // Handle URL encoded spaces and special characters in image paths
        .replace(/(\!\[.*?\]\([^)]*?)%20/g, '$1 ')
        .replace(/(\!\[.*?\]\([^)]*?)%2520/g, '$1 ')
        
        // Fix backslashes in Windows-style paths
        .replace(/(\!\[.*?\]\(\/img\/[^)]*?)\\([^)]*?\))/g, '$1/$2')
        
        // Remove Statiq directives
        .replace(/\{@[^}]*@\}/g, '') 
        
        // Convert HTML alert divs to Docusaurus admonitions FIRST (before other HTML processing)
        .replace(/<div[^>]*class="alert alert-([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/div>/g, (match, type, content) => {
            const admonitionType = type.replace('alert-', '');
            // Clean up any nested HTML in the content and preserve structure
            const cleanContent = content
                .replace(/<h[1-6][^>]*>\s*(.*?)\s*<\/h[1-6]>/gi, '**$1**')
                .replace(/<p[^>]*>\s*(.*?)\s*<\/p>/gi, '$1\n\n')
                .replace(/<\/?[^>]+>/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            return `:::${admonitionType}\n${cleanContent}\n:::`;
        })
        
        // Convert Statiq alert classes to Docusaurus admonitions
        .replace(/^(.+)\s*\{\.alert\s+\.alert-warning\}\s*$/gm, ':::warning\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert\s+\.alert-info\}\s*$/gm, ':::info\n$1\n:::')  
        .replace(/^(.+)\s*\{\.alert\s+\.alert-danger\}\s*$/gm, ':::danger\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert\s+\.alert-success\}\s*$/gm, ':::tip\n$1\n:::')
        
        // Handle dot-separated alert format
        .replace(/^(.+)\s*\{\.alert\.alert-warning\}\s*$/gm, ':::warning\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert\.alert-info\}\s*$/gm, ':::info\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert\.alert-danger\}\s*$/gm, ':::danger\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert\.alert-success\}\s*$/gm, ':::tip\n$1\n:::')
        
        // Handle shortened alert syntax
        .replace(/^(.+)\s*\{\.alert-warning\}\s*$/gm, ':::warning\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert-info\}\s*$/gm, ':::info\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert-danger\}\s*$/gm, ':::danger\n$1\n:::')
        .replace(/^(.+)\s*\{\.alert-success\}\s*$/gm, ':::tip\n$1\n:::')
        
        // Remove remaining curly brace class syntax that MDX can't handle
        .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
        .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
        .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ')
        
        // Fix problematic HTML-style buttons and links with classes
        .replace(/\[([^\]]+)\]\([^)]*\)\s*\{\.[\w\s\-\.]+\}/g, '[$1](#)')
        .replace(/\[([^\]]+)\]\(([^)]*)\)\s*\{[^}]+\}/g, '[$1]($2)')
        
        // Clean up blockquote formatting issues
        .replace(/^>\s*(.+?)\s*\{\.[\w\s\-\.]+\}/gm, '> $1')
        
        // Fix multiline blockquotes that cause "lazy line" errors  
        .replace(/^>\s*([^\n]+)\n([^>\s>])/gm, '> $1\n> $2')
        
        // Fix HTML tag issues that cause MDX parsing errors
        // Note: source tags are handled by the general self-closing tag pattern later
        
        // Fix unclosed HTML tags that cause "Expected a closing tag" errors
        .replace(/<(div|li|ul|ol|p|span)\s*([^>]*)>\s*([^<]*)\s*(?!<\/\1>)/g, '<$1$2>$3</$1>')
        
        // Fix malformed HTML tags like </<p>> and <<source
        .replace(/<\/(<[^>]*>)>/g, '')
        .replace(/<<([^>]+)>/g, '<$1>')
        
        // Fix HTML headers to markdown format
        .replace(/<h([1-6])([^>]*?)>\s*([^<]+)\s*<\/h[1-6]>/gi, (match, level, attrs, text) => {
            const hashes = '#'.repeat(parseInt(level));
            return `${hashes} ${text.trim()}`;
        })
        
        // Fix video tags that span paragraph boundaries
        .replace(/<video([^>]*?)>\s*([^<]*?)\s*(?!<\/video>)/gi, '<video$1>$2</video>')
        
        // Fix unclosed tags followed by paragraph breaks
        .replace(/(<(div|span|p|li)[^>]*>)([^<]*?)\n\n/g, '$1$3</$2>\n\n')
        
        // Fix email addresses or complex content in angle brackets (but not valid HTML tags)
        .replace(/<([^>]*[@$%#][^>]*?)>/g, (match, content) => {
            // Don't escape if it looks like a valid HTML tag
            if (content.match(/^[a-zA-Z][a-zA-Z0-9]*(\s|$)/)) {
                return match;
            }
            return `&lt;${content}&gt;`;
        })
        
        // Fix strikethrough that might conflict with MDX
        .replace(/~~([^~]+)~~\n([^>\s])/g, '~~$1~~\n\n$2')
        
        // Fix C# filename issues (# character causes module resolution errors)
        .replace(/c#/gi, 'csharp')
        
        // Fix HTML comments to JSX comments
        .replace(/<!--([^>]*)-->/g, '{/* $1 */}')
        
        // Fix JSX naming issues - @ symbols in tag names cause "unexpected character @ in name"
        .replace(/<([^>\s]*@[^>\s]*)[^>]*>/g, (match, tagName) => {
            return `&lt;${match.slice(1, -1)}&gt;`;
        })
        
        // Fix email addresses that look like JSX components - more specific patterns
        .replace(/<([a-zA-Z][^>]*@[^>]*\.[a-zA-Z]{2,}[^>]*)>/g, '&lt;$1&gt;')
        .replace(/<([^<>\s]+@[^<>\s]+\.[a-zA-Z]{2,})>/g, '&lt;$1&gt;')
        
        // Fix @ characters that appear in tag names or attributes
        .replace(/<([a-zA-Z]+[^>]*)@([^>]*?)>/g, '&lt;$1@$2&gt;')
        
        // Fix specific patterns like <mark@example.com />
        .replace(/<([a-zA-Z]+)@([^>\s]+)\s*\/?\s*>/g, '&lt;$1@$2&gt;')
        
        // Fix @ characters in self-closing or regular tags
        .replace(/<([^>]*?)@([^>]*?)\s*(\/?)>/g, '&lt;$1@$2&gt;')
        
        // Fix exclamation marks in JSX-like contexts that MDX thinks are components
        .replace(/<([^>]*!)([^>]*)>/g, '&lt;$1$2&gt;')
        
        // Fix tags with invalid JSX characters in the tag name
        .replace(/<([^a-zA-Z\/!?][^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix self-closing tags with & characters that cause "unexpected character & after self-closing slash"
        .replace(/<([^>]*?)\/\s*&([^>]*?)>/g, '<$1>&$2')
        
        // Fix & characters that appear after / in various contexts
        .replace(/\/\s*&/g, '&')
        .replace(/\s*\/\s*&/g, ' &')
        
        // Fix malformed self-closing patterns with special characters
        .replace(/<([^>]*?)\s*\/\s*([&@#$%])/g, '<$1>$2')
        .replace(/([&@#$%])\s*\/\s*>/g, '$1>')
        
        // Fix / characters before special characters in HTML content
        .replace(/\s\/\s*&([a-zA-Z]+;)/g, ' &$1')
        .replace(/([a-zA-Z0-9])\s*\/\s*&([a-zA-Z]+;)/g, '$1 &$2')
        
        // Fix malformed HTML tags that cause "unexpected character < before name" errors
        // Fix < followed by non-alphabetic characters that MDX can't parse as component names
        .replace(/<([^a-zA-Z\/!?\s][^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix < characters followed by spaces or numbers (not valid JSX component names)
        .replace(/<(\s[^>]*?)>/g, '&lt;$1&gt;')
        .replace(/<(\d[^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix URLs, emails, or file paths that got interpreted as tags (but preserve valid HTML)
        .replace(/<([^>]*?[\.@#$%][^>]*?)>/g, (match, content) => {
            // Only escape if it contains special characters that indicate it's not a valid HTML tag
            if (content.match(/[@#$%]|\.([a-z]{2,4})/i)) {
                return `&lt;${content}&gt;`;
            }
            return match;
        })
        
        // Fix specific patterns that cause "unexpected character < before name" errors
        // Escape < characters that appear before invalid JSX component names
        .replace(/<([^a-zA-Z\s\/!?][^>]*?)>/g, '&lt;$1&gt;')
        .replace(/<(\s[^>]*?)>/g, '&lt;$1&gt;')
        .replace(/<(\d[^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix < followed by special characters that aren't valid component names
        .replace(/<([^>]*?[<>][^>]*?)>/g, '&lt;$1&gt;')
        .replace(/<([^>]*?[\[\]][^>]*?)>/g, '&lt;$1&gt;')
        .replace(/<([^>]*?[{}][^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix patterns like <-something-> that aren't valid JSX
        .replace(/<(-[^>]*?)>/g, '&lt;$1&gt;')
        
        // Fix problematic sequences like </p> at end of lines that create malformed tags
        .replace(/<\/([^>]*?)([^>]*?>\s*)$/gm, (match, tagName, rest) => {
            if (tagName.includes('<') || tagName.includes('>')) {
                return `&lt;/${tagName}${rest}`;
            }
            return match;
        })
        
        // Fix common MDX parsing issues
        // Remove escaped curly braces that cause parsing errors (they were likely for Razor syntax)
        .replace(/\\{/g, '{')
        .replace(/\\}/g, '}')
        
        // Fix curly braces that MDX interprets as JSX expressions
        // Fix escaped curly braces in code blocks and inline code
        .replace(/```([^`]*?)\\+\{([^}]*?)\\+\}([^`]*?)```/gs, (match, before, content, after) => {
            return '```' + before + '{' + content + '}' + after + '```';
        })
        .replace(/`([^`]*?)\\+\{([^}]*?)\\+\}([^`]*?)`/g, (match, before, content, after) => {
            return '`' + before + '{' + content + '}' + after + '`';
        })
        
        // Fix unescaped curly braces in text that aren't inside code blocks
        .replace(/([^`])(\{[^}]*\})([^`])/g, (match, before, braces, after) => {
            // Only escape if it's not already in code or a valid JSX expression
            if (!braces.includes('/*') && !braces.match(/^\{\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\}$/)) {
                return `${before}\\${braces}${after}`;
            }
            return match;
        })
        
        // Fix specific curly brace patterns that cause acorn parsing errors
        .replace(/\{([^}]*?)\{([^}]*?)\}/g, '\\{$1\\{$2\\}')
        .replace(/\{([^}]*?)@([^}]*?)\}/g, '\\{$1@$2\\}')
        .replace(/\{([^}]*?)<([^}]*?)\}/g, '\\{$1&lt;$2\\}')
        .replace(/\{([^}]*?)#([^}]*?)\}/g, '\\{$1#$2\\}')
        
        // Fix curly braces in non-JSX contexts (like in text or URLs)
        .replace(/([^=])\{([^}]*?)\}/g, (match, before, content) => {
            // Don't escape if it looks like a JSX expression or CSS
            if (content.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/) || content.includes('/*')) {
                return match;
            }
            return `${before}\\{${content}\\}`;
        })
        
        // Clean up code blocks that have mixed escaped/unescaped HTML
        .replace(/```\s*\n([^`]*?)&lt;([^&]*?)&gt;([^`]*?)```/gs, (match, before, tag, after) => {
            return '```html\n' + before + '<' + tag + '>' + after + '```';
        })
        
        // Fix iframe and other HTML elements that got merged into text
        .replace(/([.!?])\s*(&lt;[^&]*?&gt;)/g, '$1\n\n$2')
        .replace(/([.!?])\s*(<[^>]*?>)/g, '$1\n\n$2')
        
        // Fix unclosed HTML div tags in headings and paragraphs
        .replace(/^(#{1,6}\s+.*)<div[^>]*>(?![^<]*<\/div>)/gm, '$1')
        .replace(/^([^#\n]+)<div[^>]*>(?![^<]*<\/div>)$/gm, '$1')
        
        // Fix div tags that span multiple lines improperly
        .replace(/<div([^>]*)>\s*([^<\n]+)\s*$/gm, '<div$1>$2</div>')
        
        // Fix problematic JSX-like syntax with @ symbols (email addresses in tags)
        .replace(/<([^>]*)@([^>]*)>/g, '&lt;$1@$2&gt;')
        
        // Fix malformed HTML tags that have extra < or > characters
        .replace(/<([^<>]*)<([^<>]*)>/g, '&lt;$1&lt;$2&gt;')
        
        // Fix unexpected closing slashes in self-closing tags
        .replace(/<\/([a-zA-Z][^>]*)\s*\/>/g, '<$1 />')
        
        // Fix unclosed tags at paragraph boundaries
        .replace(/(<[a-zA-Z][^>]*>)([^<]*)\n\n/g, '$1$2</$1>\n\n')
        
        // Fix mixed escaped and unescaped HTML entities
        .replace(/&lt;([^&]*?)&gt;/g, '<$1>')
        
        // Fix malformed self-closing tags with extra slashes
        .replace(/([a-zA-Z][^>]*?)\s+\/>/g, '<$1 />')
        
        // Fix code blocks with incomplete syntax highlighting
        .replace(/```\s*\n([^`]*?navigator\.serviceWorker[^`]*?)```/gs, '```javascript\n$1```')
        .replace(/```\s*\n([^`]*?<[a-zA-Z][^`]*?)```/gs, '```html\n$1```')
        
        // Fix problematic comma usage in JSX-like contexts
        .replace(/<([^>]*),([^>]*)>/g, '&lt;$1,$2&gt;')
        
        // Fix question marks in JSX-like contexts
        .replace(/<([^>]*)\?([^>]*)>/g, '&lt;$1?$2&gt;')
        
        // Fix unclosed angle brackets that look like JSX components
        .replace(/<>/g, '&lt;&gt;')
        .replace(/<\/>/g, '&lt;/&gt;')
        
        // Clean up malformed HTML attributes and ensure proper JSX syntax
        .replace(/<([a-zA-Z][a-zA-Z0-9]*)\s+([^>]*[^\/])>/g, '<$1 $2 />')
        
        // Fix "unexpected closing slash" errors - MDX doesn't expect / in non-self-closing tags
        // Remove any stray / characters that appear before > in tags
        .replace(/([^<>\s])\/\s*>/g, '$1>')
        .replace(/\s+\/\s*>/g, '>')
        
        // Fix malformed closing slashes in the middle of content
        .replace(/([^<>\s])\/([^<>\s])/g, '$1$2')
        
        // Fix specific "unexpected closing slash" patterns
        .replace(/\s\/\s*([^>]*?)>/g, ' $1>')
        .replace(/([a-zA-Z0-9])\/\s*>/g, '$1>')
        
        // Fix double slashes that cause parsing errors (like in //video or //>)
        .replace(/\/\/>/g, '>')
        .replace(/\/\s*\/\s*>/g, '>')
        
        // Fix unexpected / characters in various contexts
        .replace(/\s\/&/g, ' &')
        .replace(/\s\/\s/g, ' ')
        
        // Don't make container tags (div, span, p, etc.) self-closing
        .replace(/(<(?!img|br|hr|input|meta|link|area|base|col|embed|source|track|wbr|video|source)[a-zA-Z][^>]*?)\s*\/\s*>/gi, '$1>')
        
        // Fix self-closing tags that should be properly self-closing
        .replace(/(<(img|br|hr|input|meta|link|area|base|col|embed|source|track|wbr)[^>]*?)(?!\s*\/>)>/gi, '$1 />')
        
        // Fix video tags that were made self-closing - they should have content
        .replace(/<video([^>]*?)\s*\/\s*>/gi, '<video$1></video>')
        .replace(/<source([^>]*?)\s*\/\s*>/gi, '<source$1 />')
        
        // Fix malformed closing slash patterns in the middle of tags
        .replace(/<([^>]*?)\/([^/>][^>]*?)>/g, '<$1$2>')
        
        // Fix closing slashes that appear before attributes
        .replace(/<([a-zA-Z]+)\s*\/\s+([^>]+)>/g, '<$1 $2>')
        
        // Fix missing spaces in HTML attributes (common case: <divclass="..."> should be <div class="...">)
        .replace(/<([a-zA-Z]+)(class="[^"]*")/g, '<$1 $2')
        .replace(/<([a-zA-Z]+)(id="[^"]*")/g, '<$1 $2')
        .replace(/<([a-zA-Z]+)(src="[^"]*")/g, '<$1 $2')
        .replace(/<([a-zA-Z]+)(href="[^"]*")/g, '<$1 $2')
        
        // Fix malformed self-closing and closing tag combinations
        .replace(/(<[^>]+\s*\/>)\s*<\/[^>]*>/g, '$1')
        
        // Fix HTML class attribute for JSX compatibility
        .replace(/\bclass=/g, 'className=')
        
        // Fix anchor tags that were incorrectly made self-closing
        .replace(/<a([^>]*)\s*\/>/g, '<a$1></a>')
        
        // Fix unclosed anchor tags that cause "Expected a closing tag" errors
        .replace(/<a([^>]*?)>\s*([^<]*?)\s*(?!<\/a>)/g, '<a$1>$2</a>')
        .replace(/<a([^>]*?)>\s*([^<]*?)\s*$/gm, '<a$1>$2</a>')
        
        // Fix anchor tags that span multiple lines or have content after them
        .replace(/<a([^>]*?)>([^<]*?)([A-Z][^<]*?)$/gm, '<a$1>$2</a>$3')
        .replace(/<a([^>]*?)>([^<]*?)\s+([A-Z][a-z]{2,})/g, '<a$1>$2</a> $3')
        
        // Fix empty closing tags like </> 
        .replace(/<\/\s*>/g, '')
        
        // Fix problematic single-letter tags that MDX mistakes for components (but preserve valid HTML tags like <a>, <b>, <i>, <p>, <u>)
        .replace(/<([cdefghjklmnqrstvwxyz])\s*>/gi, '&lt;$1&gt;')
        .replace(/<\/([cdefghjklmnqrstvwxyz])\s*>/gi, '&lt;/$1&gt;')
        
        // Additional MDX compatibility fixes based on common errors
        
        // Fix mixed HTML/markdown structure that causes parsing issues
        .replace(/<div[^>]*className="alert[^"]*"[^>]*>\s*(#{1,6}\s+[^\n]+)\s*<\/div>/g, '$1')
        

        
        // Fix complex HTML structures that MDX can't handle - convert to simple markdown
        .replace(/<p[^>]*>\s*([^<]+)\s*<\/p>/g, '$1\n')
        
        // Fix specific patterns that cause "unexpected character / after self-closing slash"
        // Fix patterns like <source ... / /> or <video ... / />
        .replace(/<(source|video|img|br|hr|input|meta|link)([^>]*?)\s*\/\s*\/\s*>/gi, '<$1$2 />')
        .replace(/<(source|video|img|br|hr|input|meta|link)([^>]*?)\s*\/\s*([^>]*?)\s*\/\s*>/gi, '<$1$2$3 />')
        
        // Fix patterns where / appears in wrong place in self-closing tags
        .replace(/<([^>]*?)\s*\/\s*([^/>][^>]*?)\s*\/\s*>/g, '<$1 $2 />')
        
        // Fix video elements with malformed closing
        .replace(/<video([^>]*?)>\s*<\/video>\s*<source([^>]*?)\s*\/\s*\/>\s*<\/video>/gi, '<video$1><source$2 /></video>')
        .replace(/<video([^>]*?)>\s*([^<]*?)\s*<\/video>\s*<source([^>]*?)\s*\/\s*\/>/gi, '<video$1>$2<source$3 /></video>')
        
        // Fix remaining double slash patterns
        .replace(/\/\s*\/\s*>/g, ' />')
        .replace(/\s*\/\s*\/>/g, ' />')
        
        // Fix any remaining broken HTML tag structures
        .replace(/<([a-zA-Z]+)([^>]*?)>\s*([^<]*?)\s*<\/[^>]+>\s*([^<]*?)>/g, '<$1$2>$3</$1>$4')
        
        // Remove any HTML structures that are too complex for MDX
        .replace(/<div[^>]*>\s*<p[^>]*>/g, '')
        .replace(/<\/p>\s*<\/div>/g, '')
        
        // BULLETPROOF IMAGE PATH FIX - run at the very end to catch any broken paths
        // This ensures that regardless of what other transformations do, image paths are correct
        .replace(/!\[\]\(img([A-Za-z0-9_\-\.\s%]+)\)/g, '![](/img/$1)')
        .replace(/!\[([^\]]*)\]\(img([A-Za-z0-9_\-\.\s%]+)\)/g, '![$1](/img/$2)')
        .replace(/!\[\]\(([^\/][^)]*?\.(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))\)/gi, '![](/img/$1)')
        .replace(/!\[([^\]]*)\]\(([^\/][^)]*?\.(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))\)/gi, '![$1](/img/$2)')
        
        // Final cleanup - ensure well-formed JSX
        .replace(/(<[a-zA-Z][^>]*[^\/])>/g, (match) => {
            // Add space before > if it doesn't end with /
            if (!match.endsWith(' >') && !match.endsWith('/>')) {
                return match.slice(0, -1) + ' />';
            }
            return match;
        })
        
        // Ensure proper spacing after cleanup
        .replace(/\s{3,}/g, '  ')
        .replace(/\n{3,}/g, '\n\n');
    
    // CRITICAL FIX: Apply targeted fixes while preserving code blocks
    // This addresses the main source of remaining MDX compilation errors
    return processContentPreservingCodeBlocks(content, (nonCodeContent) => {
        return nonCodeContent
            // Fix curly braces that need escaping for MDX (comprehensive patterns)
            .replace(/([^\\])\{([^}]*)\}/g, '$1\\{$2\\}')
            .replace(/^(\{[^}]*\})/gm, '\\$1')
            .replace(/\{\*/g, '\\{*')
            .replace(/\*\}/g, '*\\}')
            
            // Fix double angle brackets 
            .replace(/<<([^>]+)>/g, '<$1>')
            
            // Fix self-closing div tags (not allowed in MDX)
            .replace(/<div([^>]*)\s*\/>/g, '<div$1></div>')
            .replace(/<button([^>]*)\s*\/>/g, '<button$1></button>')
            .replace(/<label([^>]*)\s*\/>/g, '<label$1></label>')
            .replace(/<input([^>]*)\s*\/>/g, '<input$1 />')
            .replace(/<select([^>]*)\s*\/>/g, '<select$1></select>')
            .replace(/<option([^>]*)\s*\/>/g, '<option$1></option>')
            
            // Fix basic line breaks in extremely long content
            .replace(/(\S)\s+([A-Z][a-z]{2,}[^.!?]*[.!?])\s+([A-Z][a-z]{2,})/g, '$1\n\n$2\n\n$3')
            .replace(/([.!?])\s+(#{1,6}\s)/g, '$1\n\n$2')
            .replace(/(\}\s*)\s+([A-Z][a-z])/g, '$1\n\n$2');
    });
}

function convertStatiqToDocusaurus(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter and content - handle various frontmatter formats
    let frontmatterMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
    
    // Try alternative regex for malformed frontmatter (content on same line as closing ---)
    if (!frontmatterMatch) {
        frontmatterMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*([\s\S]*)$/);
    }
    
    // Try regex for content immediately after closing --- (no newline)
    if (!frontmatterMatch) {
        const malformedMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(.*)$/s);
        if (malformedMatch) {
            // Extract frontmatter and separate content properly
            const [, frontmatter, contentAfterDashes] = malformedMatch;
            frontmatterMatch = [malformedMatch[0], frontmatter, '\n' + contentAfterDashes];
        }
    }
    
    // Handle extremely malformed frontmatter where content starts immediately after ---
    if (!frontmatterMatch) {
        const extremeMalformedMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*([^-][\s\S]*)$/s);
        if (extremeMalformedMatch) {
            const [, frontmatter, contentAfterDashes] = extremeMalformedMatch;
            frontmatterMatch = [extremeMalformedMatch[0], frontmatter, '\n\n' + contentAfterDashes];
        }
    }
    
    if (!frontmatterMatch) {
        console.warn(`No frontmatter found in ${filePath}`);
        
        // Create proper frontmatter for files without it
        const filename = path.basename(filePath, '.md');
        let title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        // Special cases for files with known issues
        if (filename === 'miniblog clone') {
            title = 'First Post';
        }
        
        const currentDate = new Date().toISOString().split('T')[0];
        
        const frontmatterContent = `Title: "${title}"\nPublished: ${currentDate}\nTags: [General]`;
        const bodyContent = applyContentTransformations(content);
        
        return `---\n${frontmatterContent}\n---\n\n${bodyContent}`;
    }
    
    const [, frontmatter, markdownContent] = frontmatterMatch;
    
    // Parse YAML frontmatter with better multi-line support
    // Normalize line endings first
    const normalizedFrontmatter = frontmatter.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedFrontmatter.split('\n');
    const metadata = {};
    let currentKey = null;
    let currentValue = '';
    let inListMode = false;
    
    lines.forEach((line, index) => {
        const keyMatch = line.match(/^([A-Za-z][A-Za-z0-9]*)\s*:\s*(.*)$/);
        const listMatch = line.match(/^\s*-\s+(.*)$/);
        
        if (keyMatch) {
            // Save previous key-value pair
            if (currentKey) {
                metadata[currentKey.toLowerCase()] = currentValue.trim();
            }
            // Start new key-value pair
            const [, key, value] = keyMatch;
            currentKey = key;
            currentValue = value;
            inListMode = false;
            
            // Handle malformed inline list syntax like "Tags:  - Item1  - Item2  - Item3"
            if (value && value.includes(' - ')) {
                const inlineListItems = value.split(' - ').map(item => item.trim()).filter(item => item);
                if (inlineListItems.length > 1) {
                    // First item might have leading dash, clean it
                    inlineListItems[0] = inlineListItems[0].replace(/^-\s*/, '');
                    currentValue = inlineListItems.join(', ');
                    inListMode = true;
                }
            }
            
            // Handle another common malformed pattern: "Tags:  - Item1  - Item2" with multiple spaces
            if (value && value.includes('  - ')) {
                const spacedListItems = value.split('  - ').map(item => item.trim()).filter(item => item);
                if (spacedListItems.length > 1) {
                    spacedListItems[0] = spacedListItems[0].replace(/^-\s*/, '');
                    currentValue = spacedListItems.join(', ');
                    inListMode = true;
                }
            }
        } else if (listMatch && currentKey) {
            // YAML list entry
            if (!inListMode) {
                currentValue = ''; // Reset for list mode
                inListMode = true;
            }
            currentValue += (currentValue ? ', ' : '') + listMatch[1].trim();
        } else if (currentKey && line.trim() === '' && !inListMode) {
            // Empty line after key, might be followed by list items - keep currentValue as is
        } else if (currentKey && line.trim() && !line.match(/^\s*-/)) {
            // Continuation of multi-line value (not a list)
            if (!inListMode) {
                currentValue += ' ' + line.trim();
            }
        }
    });
    
    // Save the last key-value pair
    if (currentKey) {
        metadata[currentKey.toLowerCase()] = currentValue.trim();
    }
    
    // Parse tags - they should already be cleaned up from list format
    let tags = [];
    if (metadata.tags) {
        tags = metadata.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    
    // Convert to Docusaurus format
    const description = metadata.lead || metadata.description || '';
    const cleanDescription = description.replace(/^["']+|["']+$/g, '').trim();
    
    const docusaurusMetadata = {
        title: metadata.title || 'Untitled',
        authors: metadata.author ? [metadata.author] : ['mark-burton'],
        tags: tags,
    };
    
    // Only add description if it's not empty
    if (cleanDescription) {
        docusaurusMetadata.description = cleanDescription;
    }
    
    // Add date from filename if available
    const dateMatch = path.basename(filePath).match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
        docusaurusMetadata.date = dateMatch[1];
    }
    
    // Build new frontmatter
    const newFrontmatter = Object.entries(docusaurusMetadata)
        .filter(([key, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
            }
            return `${key}: "${value}"`;
        })
        .join('\n');
    
    // Clean up Statiq-specific syntax and MDX incompatible content
    const cleanedContent = applyContentTransformations(markdownContent);
    
    return `---\n${newFrontmatter}\n---\n\n${cleanedContent}`;
}

function migratePost(sourceFile) {
    const fileName = path.basename(sourceFile);
    // Fix C# in filenames that cause module resolution errors
    const safeFileName = fileName.replace(/c#/gi, 'csharp');
    const targetFile = path.join(DOCUSAURUS_BLOG_DIR, safeFileName);
    
    console.log(`Migrating ${fileName}...`);
    
    try {
        const convertedContent = convertStatiqToDocusaurus(sourceFile);
        fs.writeFileSync(targetFile, convertedContent);
        console.log(`✅ Migrated ${fileName}`);
    } catch (error) {
        console.error(`❌ Error migrating ${fileName}:`, error.message);
    }
}

function main() {
    // Ensure target directory exists
    if (!fs.existsSync(DOCUSAURUS_BLOG_DIR)) {
        fs.mkdirSync(DOCUSAURUS_BLOG_DIR, { recursive: true });
    }
    
    // Get all markdown files from Statiq posts
    const postsDir = path.resolve(__dirname, STATIQ_POSTS_DIR);
    
    if (!fs.existsSync(postsDir)) {
        console.error(`Source directory not found: ${postsDir}`);
        console.log('Make sure to run this script from the docs directory');
        return;
    }
    
    const files = fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(postsDir, file));
    
    console.log(`Found ${files.length} posts to migrate`);
    
    // Process all posts
    files.forEach(migratePost);
    
    console.log('\n🎉 Migration complete!');
    console.log('📝 Please review the migrated posts and adjust as needed');
    console.log('🔧 You may need to update image paths and internal links');
}

if (require.main === module) {
    main();
}

module.exports = { convertStatiqToDocusaurus };