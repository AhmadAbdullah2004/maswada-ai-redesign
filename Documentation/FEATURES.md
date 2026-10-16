# Maswada AI - Features Documentation

## Overview

Maswada AI is a modern, full-stack AI-powered note-taking application with bilingual support (English/Arabic). Built with React 19, Express.js, and OpenAI GPT-5-mini, it demonstrates production-ready patterns for authentication, internationalization, and AI integration.

---

## Core Features

### 1. 🔐 Authentication & Authorization

#### User Authentication
- **Provider**: Clerk authentication system
- **Token-based Security**: JWT verification on all protected endpoints
- **Session Management**: Persistent authentication across sessions
- **Protected Routes**: Client-side route protection
- **User Isolation**: All data scoped to authenticated user's ID

#### Sign-In/Sign-Up
- Clean, user-friendly authentication pages
- Seamless integration with Clerk UI components
- Automatic redirection after authentication
- Secure token storage and transmission

---

### 2. 📝 Notes Management

#### Create Notes
- **Simple Creation**: Quick note creation from home page
- **Auto-navigation**: Automatic redirect to note detail page after creation
- **Default Language**: Detects and sets note language automatically

#### Read Notes
- **List View**: Display all user's notes on home page
- **Search Functionality**: Real-time search through notes by title and content
- **Detail View**: Full note editor with title and content fields
- **Language Detection**: Automatic detection of text direction (LTR/RTL)

#### Update Notes
- **Inline Editing**: Edit title and content directly in detail view
- **Auto-Save**: Debounced auto-save every 2 seconds after editing
- **Save Status Indicator**: Visual feedback for save states:
  - `Unsaved Changes` - Recent edits not yet saved
  - `Saving...` - Save in progress
  - `Saved Successfully` - Changes persisted
- **Optimistic Updates**: Immediate UI updates for better UX

#### Delete Notes
- **Confirmation Dialog**: Prevent accidental deletion with confirmation modal
- **Translated Messages**: Fully localized delete confirmation
- **Toast Notifications**: Success/error feedback after deletion
- **Automatic Navigation**: Returns to home page after deletion

#### Note Properties
Each note contains:
- Unique UUID identifier
- User ID (for authorization)
- Title and content fields
- Language indicator (en/ar)
- Optional summary field
- Creation and update timestamps

---

### 3. 🤖 AI-Powered Features

All AI features are powered by OpenAI GPT-5-mini and support both English and Arabic text.

#### Summarize
- **Purpose**: Generate intelligent, concise summaries of note content
- **Usage**: One-click summarization from note detail page
- **Language Support**: Works with both English and Arabic text
- **Result**: Replaces note content with AI-generated summary
- **Feedback**: Toast notification on success/failure

#### Translate
- **Auto-Detection**: Automatically detects source language
- **Bidirectional**: Translates English ↔ Arabic
- **Smart Translation**: Maintains context and tone
- **One-Click**: Single button to translate entire note
- **Seamless Integration**: Updates note content directly

#### Change Tone (Rewrite)
Four different rewriting modes to adjust note style:

1. **Comedy**: Make content humorous and entertaining
2. **Formal**: Professional and business-appropriate tone
3. **Casual**: Friendly and conversational style
4. **Shorter**: Condense content while preserving meaning (hidden but available)

**Implementation**:
- Dropdown menu for mode selection
- Preserves original meaning while changing tone
- Works with any language
- Instant content replacement

#### AI Feature Characteristics
- **Non-destructive Initially**: AI results replace content (can be undone with browser back)
- **Auto-save Trigger**: All AI operations trigger auto-save
- **Error Handling**: Graceful failure with user-friendly error messages
- **Loading States**: Visual feedback during AI processing
- **Toast Notifications**: Success/failure feedback for all operations

---

### 4. 🌍 Internationalization (i18n)

#### Language Support
- **English** (Default)
- **Arabic** (العربية)

#### Language Switching
- **Header Toggle**: Easy language switcher in application header
- **Persistent Selection**: Language preference saved to localStorage
- **Route Integration**: Language embedded in URL structure (`/en/...`, `/ar/...`)
- **Automatic Redirection**: Maintains current page when switching languages

#### RTL/LTR Support
- **Automatic Direction**: Detects text direction based on language
- **Content-Aware**: Individual note content can have different direction than UI
- **CSS Direction**: Proper `dir` attribute on HTML elements
- **Icon Mirroring**: Navigation arrows flip in RTL mode (ArrowLeft ↔ ArrowRight)

#### Translated Components
All UI text is fully localized:
- Application header and footer
- Navigation elements
- Button labels
- Form placeholders
- Toast notifications
- Dialog messages
- Status indicators
- Error messages

#### Translation Files
- `frontend/src/i18n/en.json` - English translations
- `frontend/src/i18n/ar.json` - Arabic translations
- Structured with namespaced keys (e.g., `noteDetail.translate`)

---

### 5. 💾 Auto-Save System

#### Smart Debouncing
- **2-Second Delay**: Waits 2 seconds after last edit before saving
- **Prevents Spam**: Reduces unnecessary API calls during rapid typing
- **Automatic Trigger**: No manual save button needed

#### Save States
Visual indicator shows current save status:
1. **Initial**: No changes yet
2. **Unsaved Changes**: Recent edits pending
3. **Saving...**: Save operation in progress
4. **Saved Successfully**: All changes persisted

#### User Editing Detection
- Tracks whether user has made changes
- Only triggers auto-save when actual edits exist
- Resets editing flag after successful save

#### Implementation
- Custom `useAutoSave` hook
- Cleanup on component unmount
- Debounce timer reset on each edit
- Visual feedback component

---

### 6. 🎨 User Interface & Design

#### Design System
- **Glass Morphism**: Translucent card components with backdrop blur
- **Tailwind CSS v4**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Prepared for theme switching

#### Component Library
- **shadcn/ui Components**:
  - Buttons with variants (default, outline, destructive)
  - Input and Textarea fields
  - Alert Dialogs for confirmations
  - Dropdown Menus for options
  - Toast notifications (Sonner)
- **Lucide Icons**: Modern, consistent iconography
- **Custom Components**: GlassCard, AutoSaveIndicator, DeleteDialog

#### Layout Structure
- **AppLayout**: Consistent header and footer across pages
- **Header**: Logo, navigation, language switcher, user menu
- **Footer**: Copyright and attribution
- **Content Area**: Centered, max-width container for optimal reading

#### User Experience
- **Loading States**: Skeleton screens and loading indicators
- **Error States**: Clear error messages with recovery options
- **Empty States**: Helpful messages when no content exists
- **Search Highlighting**: Visual feedback for search results
- **Smooth Transitions**: Animated state changes
- **Accessible**: Keyboard navigation and ARIA labels

---

### 7. 🔍 Search & Filter

#### Search Functionality
- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Searches both title and content
- **Case-Insensitive**: Flexible matching
- **Client-side Filtering**: Fast, no server requests needed

#### Search Features
- **Search Input**: Prominent search field on home page
- **Clear Results**: Shows matching notes count
- **No Results State**: Helpful message when no matches found
- **Search Icon**: Visual indicator for search field
- **Responsive**: Works on all screen sizes

---

### 8. 🚦 Routing & Navigation

#### Route Structure
```
/:locale/              → Home page (notes list)
/:locale/note/:id      → Note detail/editor page
/:locale/sign-in       → Sign-in page
/:locale/sign-up       → Sign-up page
*                      → 404 Not found page
```

#### Navigation Features
- **Locale-Aware**: All routes include language prefix
- **Protected Routes**: Authentication required for notes pages
- **Automatic Redirects**: Unauthenticated users sent to sign-in
- **Breadcrumb Navigation**: Back button in note detail view
- **Browser History**: Proper back/forward button support
- **Deep Linking**: Direct access to specific notes via URL

#### Custom Hooks
- `useLocaleNavigate`: Navigate while preserving language
- `useLanguage`: Access current language and RTL status
- Integration with React Router v7

---

### 9. 📊 Data Management

#### API Client
- **Axios-based**: RESTful API communication
- **Token Injection**: Automatic Clerk token attachment
- **Error Handling**: Centralized error processing
- **Base URL Configuration**: Environment-based API endpoint

#### Custom Hooks
- `useNotesAPI`: CRUD operations for notes
  - `getNotes()` - Fetch all user notes
  - `getNoteById(id)` - Fetch single note
  - `createNote(data)` - Create new note
  - `updateNote(id, data)` - Update existing note
  - `deleteNote(id)` - Delete note

- `useAIFeaturesAPI`: AI operations
  - `summarize({ noteId, text })` - Summarize content
  - `translate({ noteId, text })` - Translate content
  - `rewrite({ noteId, text, mode })` - Rewrite with tone

#### Data Types
TypeScript interfaces for type safety:
- `Note`: Complete note structure
- `NoteInput`: Create/update payload
- `RewriteMode`: AI rewrite options
- `AutoSaveStatus`: Save state tracking

---

### 10. 🛡️ Security Features

#### Backend Security
- **JWT Verification**: Every protected endpoint verifies Clerk tokens
- **User Isolation**: Database queries filtered by userId
- **Request Validation**: Zod schemas validate all inputs
- **Error Sanitization**: No sensitive data in error responses
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Secrets stored securely

#### Frontend Security
- **Protected Routes**: Client-side route guards
- **Token Storage**: Secure Clerk-managed token storage
- **XSS Prevention**: React's built-in XSS protection
- **API Key Protection**: No API keys in frontend code
- **Type Safety**: TypeScript prevents runtime errors

---

### 11. 🔧 Developer Experience

#### TypeScript
- **Full Type Coverage**: Both frontend and backend
- **Type Inference**: Minimal type annotations needed
- **Interface Definitions**: Shared types between layers
- **Compile-time Safety**: Catch errors before runtime

#### Code Organization
- **Feature-based Structure**: Organized by domain
- **Separation of Concerns**: Services, routes, components separated
- **Custom Hooks**: Reusable logic extraction
- **Component Composition**: Small, focused components

#### Development Tools
- **Vite**: Fast HMR and build times
- **ESLint**: Code quality and consistency
- **TypeScript**: Type checking
- **NPM Scripts**: Convenient development commands

#### Testing Support
- API testing documentation
- Clear error messages
- Console logging for debugging
- Health check endpoint

---

## Technical Architecture

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite with Sequelize ORM
- **Authentication**: Clerk SDK
- **Validation**: Zod
- **AI**: OpenAI GPT-5-mini

### Frontend Stack
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Clerk React SDK
- **Styling**: Tailwind CSS v4
- **i18n**: react-intl
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Notifications**: Sonner

### Database Schema
```sql
Notes
  - id: UUID (Primary Key)
  - userId: String (Index)
  - title: String
  - content: Text
  - language: Enum('en', 'ar')
  - summary: Text (Nullable)
  - createdAt: DateTime
  - updatedAt: DateTime
```

---

## API Endpoints

### Public
- `GET /health` - Health check

### Authentication Required
- `GET /api/notes` - List all user notes
- `POST /api/notes` - Create note
- `GET /api/notes/:id` - Get note by ID
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `POST /api/ai/summarize` - Summarize text/note
- `POST /api/ai/rewrite` - Rewrite text/note
- `POST /api/ai/translate` - Translate text/note

---

## Environment Configuration

### Backend Variables
```
PORT=3001
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
SQLITE_PATH=./data/maswada.db
OPENAI_API_KEY=sk-...
OPENAI_ORGANIZATION_ID=org-... (Optional)
```

### Frontend Variables
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3001
```

---

## Future Enhancement Possibilities

While not currently implemented, the architecture supports:
- Note categories/tags
- Note sharing and collaboration
- Rich text editing
- File attachments
- Export functionality (PDF, Markdown)
- Note versioning/history
- Favorites/pinning
- Dark mode toggle
- Offline support
- Mobile apps
- Voice-to-text
- Additional AI features (grammar check, expand, shorten)

---

## Performance Features

- **Debounced Auto-save**: Reduces API calls
- **Client-side Search**: No server requests for filtering
- **Optimistic Updates**: Immediate UI feedback
- **Lazy Loading**: Code splitting for routes
- **Minimal Dependencies**: Fast bundle sizes
- **SQLite**: Fast local database for development
- **React 19**: Latest performance optimizations

---

## Accessibility Features

- Semantic HTML elements
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management in dialogs
- Sufficient color contrast
- Responsive text sizing
- Screen reader friendly
- RTL support for Arabic users

---

## Documentation

- `README.md` - Project overview and setup
- `SETUP.md` - Detailed setup instructions
- `TESTING.md` - API testing guide (backend)
- `AI_FEATURES.md` - AI features documentation (backend)
- `FEATURES.md` - This document

---

## License

MIT License - Free for personal and commercial use

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✓
