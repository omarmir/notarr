# Notarr

A lightweight, self-hosted note-taking application with filesystem-based storage. Built with Nuxt 3, TypeScript, and designed for simplicity and performance. The primary goal of this app is to manage your notes in a manner that is 100% portable. You should be able to manage your notes in terminal, notepad or any other app - there is no database, just folders and files.

## Features

- 📂 **Notebook-based Organization** - Folders as notebooks, markdown files as notes
- 🔍 **Universal Search** - Fast content search across all notes (OS-optimized)
- 📱 **Markdown Support** - Native .md file handling with proper MIME types
- 🔒 **Local Storage** - No databases - uses your existing filesystem
- 🐳 **Docker Ready** - Full container support with sample compose file
- 🔧 **TypeSafe API** - Fully typed REST endpoints with validation
- 🚀 **Performance** - Optimized file operations and platform-specific search
- 📱 **Mobile friendly** - Mobile friendly layout for viewing and editing notes

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 8+
- Docker (optional)

### Tech stack

- Nuxt3 and Vue
- Tailwind 3

### Contribution guide

Right now, the place that needs the most help is the home page, its hard to read so some help there would be appreciated. Open an issue and discuss the issue first. Notarr is distributed under the GNU Affero General Public License.

### Local Development

```bash
# Clone repository
git clone https://github.com/omarmir/notarr.git
cd notarr

# Install dependencies
pnpm install

# Start development server
pnpm run dev

### Features pending
- [ ] Rename notes (90% complete)
- [ ] Rename notebooks (90% complete)
- [ ] Delete notes
- [ ] Archive notes
- [ ] Rollup checklists - Allow users to rollup checklist items from all their notes into its own page for easier task management
- [ ] File upload (deciding to store in folder vs base64 in md file)
```
