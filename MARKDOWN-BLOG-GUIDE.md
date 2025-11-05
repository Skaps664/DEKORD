# Markdown Guide for Blog Posts

## Overview
Your blog now supports **Markdown** formatting! Write content naturally and it will be converted to beautiful HTML automatically.

## What is Markdown?
Markdown is a simple way to format text without writing HTML. It's much easier and more readable.

## Basic Markdown Syntax

### 1. Headings
```markdown
# Heading 1 (Don't use - reserved for title)
## Heading 2 (Main sections)
### Heading 3 (Subsections)
#### Heading 4 (Smaller subsections)
```

### 2. Paragraphs
Just write text normally. Leave a blank line between paragraphs.

```markdown
This is the first paragraph.

This is the second paragraph. Notice the blank line above.
```

### 3. Bold & Italic
```markdown
**This text is bold**
*This text is italic*
***This text is bold and italic***
```

Result:
- **This text is bold**
- *This text is italic*
- ***This text is bold and italic***

### 4. Lists

**Bullet Points:**
```markdown
- First item
- Second item
- Third item
  - Nested item
  - Another nested item
```

**Numbered Lists:**
```markdown
1. First step
2. Second step
3. Third step
   1. Sub-step
   2. Another sub-step
```

### 5. Links
```markdown
[Link text](https://example.com)
[Visit our store](/catalog)
[Check our blog](/blog)
```

### 6. Images

**Simple Image:**
```markdown
![Alt text for image](/blog/my-image.jpg)
```

**Image from Supabase:**
```markdown
![Product showcase](https://awkcvltduqojgdgdjhca.supabase.co/storage/v1/object/public/product-images/cable.jpg)
```

### 7. Blockquotes
```markdown
> "This is a quote that stands out from regular text."
> 
> You can have multiple paragraphs in a quote.
```

Result:
> "This is a quote that stands out from regular text."

### 8. Code

**Inline Code:**
```markdown
Use `code` for technical terms or commands.
```

**Code Blocks:**
````markdown
```
function hello() {
  console.log("Hello World!");
}
```
````

### 9. Horizontal Line
```markdown
---
```

Result: A horizontal separator line

### 10. Line Breaks
```markdown
First line
Second line (will appear on next line automatically)

Or leave a blank line for a paragraph break.
```

## Complete Blog Post Example

Here's a full blog post written in Markdown:

```markdown
## Introduction to Premium Cables

At dekord, we believe **quality matters**. That's why every product we create goes through rigorous testing before reaching your hands.

![Our testing facility](/blog/testing-lab.jpg)

## Why Quality Materials Make a Difference

Most charging cables fail within weeks due to:

- Poor quality plastic that cracks
- Weak internal wiring
- Loose connectors
- No strain relief

### Our Approach

We use **military-grade braided nylon** that can withstand:

1. 10,000+ bend cycles
2. Extreme temperatures (-40°C to 85°C)
3. Daily wear and tear
4. Accidental pulls and tugs

> "I've used cheap cables for years. These are the first ones that actually last!" 
> - Happy Customer

## Technical Specifications

Here's what makes our cables different:

| Feature | Cheap Cable | dekord Cable |
|---------|-------------|--------------|
| Durability | 100 bends | 10,000+ bends |
| Charging Speed | 5W | 100W |
| Warranty | None | 2 years |

![Internal cable structure](/blog/cable-internals.jpg)

### What You Get

When you buy a dekord cable, you're getting:

- **Fast Charging**: Up to 100W power delivery
- **Data Transfer**: 480Mbps speeds
- **Universal**: Works with all USB-C devices
- **Durable**: Tested to last 5+ years

---

## Final Thoughts

Don't settle for cables that break every few months. Invest in quality that lasts.

[Shop Premium Cables](/catalog) | [Read More Stories](/blog)
```

## Tips for Great Blog Posts

### 1. Structure Your Content
```markdown
## Introduction
(Hook the reader)

## Main Problem
(What issue are you solving?)

## Your Solution
(How you solve it)

## Details/Features
(Specifics about your product/topic)

## Conclusion
(Summary and call-to-action)
```

### 2. Use Images Wisely
- Add images every 2-3 paragraphs
- Always include alt text: `![Description](url)`
- Use high-quality images (800-1200px wide)

### 3. Break Up Long Text
- Use headings (##, ###) to organize
- Add bullet points for easy scanning
- Include quotes for emphasis
- Add horizontal lines (---) to separate sections

### 4. Add Links
- Link to your products: `[Check out our cables](/catalog)`
- Link to other blog posts: `[Read our story](/blog/brand-story)`
- External links: `[Learn more](https://example.com)`

## How to Add Images

### Option 1: Upload to Supabase (Recommended)
1. Go to Supabase Dashboard → Storage
2. Create `blog-images` bucket (or use `product-images`)
3. Upload your image
4. Copy the public URL
5. Use in markdown: `![Description](URL)`

### Option 2: Use Public Folder
1. Add image to: `/website/public/blog/`
2. Reference: `![Description](/blog/image-name.jpg)`

## Testing Your Content

1. Write your content in Markdown in the admin panel
2. Save as draft first
3. View on website to check formatting
4. Make adjustments if needed
5. Publish when happy

## Common Issues

### Images Not Showing?
- Check the URL is correct
- Make sure image is in public folder or Supabase
- Verify image file extension (.jpg, .png, .webp)

### Formatting Looks Wrong?
- Check you have blank lines between paragraphs
- Make sure lists have proper spacing
- Verify heading levels (## not #)

### Links Not Working?
- Use full URL for external: `https://example.com`
- Use relative path for internal: `/catalog`
- Don't forget the brackets: `[text](url)`

## Quick Reference

| Syntax | Result |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[text](url)` | Link |
| `![alt](url)` | Image |
| `## Heading` | Heading 2 |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `` `code` `` | Inline code |
| `> quote` | Blockquote |
| `---` | Horizontal line |

## Example: Quick Blog Post

Try this in your admin panel:

**Title:** Why dekord Cables Last Longer

**Slug:** why-dekord-cables-last-longer

**Excerpt:** Discover the engineering and materials that make dekord cables 10x more durable than ordinary cables.

**Content:**
```markdown
## The Problem with Ordinary Cables

Most people replace their charging cables every 2-3 months. Why?

- Cheap materials that fray
- Weak connectors that break
- No quality control

![Broken cable comparison](/premium-braided-cable-lifestyle.jpg)

## How We're Different

At dekord, we use **premium materials**:

1. Military-grade braided nylon
2. Reinforced stress points
3. Gold-plated connectors
4. Tested 10,000+ times

> "Best cable I've ever owned. Still works like new after 2 years!"

## What This Means for You

- Save money (buy once, not monthly)
- Fast charging (100W support)
- Peace of mind (2-year warranty)

---

Ready to upgrade? [Shop Now](/catalog)
```

**Category:** Product Launch

**Tags:** `["cables", "quality", "durability"]`

---

Now you can write beautiful blog posts using simple Markdown! ✍️ No HTML knowledge needed! 🎉
