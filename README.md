# Nanote

**CONSIDER THIS PRE-ALPHA**: There will be bugs even I am daily driving this for myself.

A lightweight, self-hosted note-taking application with filesystem-based storage. Built with Nuxt 3, TypeScript, and designed for simplicity and performance. The primary goal of this app is to manage your notes in a manner that is 100% portable. You should be able to manage your notes in terminal, notepad or any other app - there is no database, just folders and files.

**Auth** : If you don't set the SECRET_KEY environment variable the default secret key is `nanote` though you should set key

## Screenshot

![Screenshot](/screenshot.png?raw=true 'Nanote screenshot')

## Features

- 📂 **Notebook-based Organization** - Folders as notebooks, markdown files as notes
- 🔍 **Universal Search** - Fast content search across all notes (OS-optimized)
- 🖹 **Markdown Support** - Native .md file handling with proper MIME types
- 🔒 **Local Storage** - No databases - uses your existing filesystem
- 🐳 **Docker Ready** - Full container support with sample compose file
- 🔧 **TypeSafe API** - Fully typed REST endpoints with validation
- 🚀 **Performance** - Optimized file operations and platform-specific search
- 📱 **Mobile friendly** - Mobile friendly layout for viewing and editing notes

### Pending

- [ ] **Archive** - Archive notes and notebooks
- [ ] **Rollup checklists** - Rollup checklist items from all their notes into its own page for easier task management
- [ ] **File upload** - Images done, need one for file
- [ ] **Encryption** - Note/Notebook encryption at rest
- [ ] **Apps** - Mobile/desktop apps (possibly via PWA)

## Getting Started

### Docker

You can use the following published image with the compose file

```bash
omarmir/nanote
```

OR

You can clone the repo, build the image and run the compose file.

```bash
git clone https://github.com/omarmir/nanote.git
cd nanote
docket build -t nanote .
```

Edit the compose file (specifically the volumes mount point and environment path):

```yml
environment:
  - NOTES_PATH=/notes
  - SECRET_KEY=<yourkey>
volumes:
  - /path/to/local/folder:/notes
```

If these are not set then the app will save files locally within itself.

```bash
docker compose -d up
```

### Prerequisites

- Node.js 18+
- PNPM 8+
- Docker (optional)

### Tech stack

- Nuxt3 and Vue
- Tailwind 3

### Contributing

Right now, the place that needs the most help is the home page, its hard to read so some help there would be appreciated. Open an issue and discuss the issue first. Nanote is distributed under the GNU Affero General Public License.

### Local Development

```bash
# Clone repository
git clone https://github.com/omarmir/nanote.git
cd nanote

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### API

The nanote server does expose an API and this will be documented better in the future, the app is in VERY early stages so things are still liable to shift. I am now daily driving this for my notes so its not going anywhere and you should expect updates.
