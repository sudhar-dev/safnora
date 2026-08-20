# SAFNORA --- Complete Project Plan & Requirements {#safnora--complete-project-plan--requirements}

**Project:** SAFNORA\
**Tagline:** Journeys Together. Memories Forever.\
**SIH Problem Statement:** SIH25082\
**Problem Statement:** Development of a travel-related software
application that can be installed on mobile phones and capture
trip-related information\
**Theme:** Travel & Tourism\
**Category:** Software\
**Platform:** Mobile\
**Technology:** React Native + Firebase

> The SIH source identifies SIH25082 as a mobile travel-related software
> application for capturing trip-related information. The detailed
> modules below are the team\'s proposed product scope built around that
> problem statement.

---

## 1. Product Vision {#1-product-vision}

SAFNORA is a **mobile-first collaborative travel platform** that
provides one digital space for the complete lifecycle of a group
journey.

**PLAN → COLLABORATE → MANAGE → EXPERIENCE → REMEMBER**

### Core value proposition

> **SAFNORA connects people, places, plans, expenses and memories into
> one complete digital journey.**

---

## 2. Problem {#2-problem}

During group travel, information is commonly distributed across
messaging apps, map applications, notes, expense applications,
galleries, cloud storage and social platforms.

This creates:

- Scattered information
- Decisions buried in conversations
- Difficult expense tracking
- Photos distributed across members
- Incomplete trip history
- Difficult document retrieval
- No single source of truth for the trip

### Proposed opportunity

Make the **trip itself the central workspace** for all planning,
coordination, management and memories.

---

# 3. Objectives {#3-objectives}

1.  Centralize trip information.
2.  Enable group collaboration.
3.  Simplify destination and itinerary planning.
4.  Manage shared expenses and settlements.
5.  Connect memories with people, places and time.
6.  Preserve a complete trip history.
7.  Reduce dependency on multiple disconnected applications.
8.  Provide a scalable base for future travel integrations.

---

# 4. Target Users {#4-target-users}

- Friends and families
- College and student groups
- Corporate teams
- Travel communities
- Organized group tours

---

# 5. Product Modules {#5-product-modules}

## 5.1 Authentication & User Management {#51-authentication--user-management}

### Features

- Registration
- Login/logout
- Google Sign-In
- Password reset
- User profile
- Profile photo
- Account settings
- Account deletion

### Firebase

- Firebase Authentication
- Firestore user profile
- Firebase Storage for profile images

---

## 5.2 Trip Management {#52-trip-management}

### Features

- Create trip
- Edit trip
- Archive/delete trip
- Trip name
- Destination
- Start/end date
- Description
- Cover image
- Privacy
- Trip status

### Trip statuses

- Draft
- Planning
- Active
- Completed
- Archived

### Trip dashboard

- Trip overview
- Members
- Upcoming activities
- Expense summary
- Recent memories
- Activity feed
- Quick actions

---

## 5.3 Group & Member Management {#53-group--member-management}

### Features

- Invite members
- Invite link
- QR invitation
- Join request
- Accept/reject member
- Remove member
- Member list
- Roles
- Permissions

### Roles

**Owner** --- full trip control\
**Co-Admin** --- delegated management\
**Member** --- normal contribution\
**Viewer** --- read-only access

---

## 5.4 Places & Maps {#54-places--maps}

### Features

- Search places
- Add destination
- Save place
- Remove place
- Categories
- Address
- Coordinates
- Notes
- Priority
- Visit status
- Added-by member

### Categories

- Attraction
- Restaurant
- Hotel
- Activity
- Shopping
- Transport
- Emergency
- Custom

### Maps

Use Google Maps / Places APIs for:

- Place search
- Map display
- Coordinates
- Directions
- Route visualization

---

## 5.5 Collaborative Itinerary {#55-collaborative-itinerary}

### Features

- Day-wise itinerary
- Activities
- Time slots
- Locations
- Notes
- Reordering
- Assigned members
- Estimated cost
- Completion status

### Planned vs Actual

Future support for:

- Planned time
- Actual time
- Delays
- Changes
- Completion

---

## 5.6 Polls & Group Decisions {#56-polls--group-decisions}

A key proposed SAFNORA workflow.

### Features

- Create poll
- Add options
- Voting deadline
- Member voting
- Vote count
- Close poll
- Final result
- Convert result to itinerary/place

### Workflow

**Poll → Vote → Decision → Itinerary**

### Use cases

- Destination
- Restaurant
- Hotel
- Activity
- Transport
- Departure time

---

## 5.7 Expense Management {#57-expense-management}

### Features

- Add expense
- Category
- Amount
- Currency
- Payer
- Participants
- Split method
- Date
- Location
- Note
- Receipt

### Categories

- Accommodation
- Food
- Transport
- Tickets
- Activities
- Shopping
- Fuel
- Parking
- Miscellaneous

### Split methods

- Equal
- Custom amount
- Percentage
- Shares

---

## 5.8 Expense Settlement {#58-expense-settlement}

### Features

- Member balance
- Who paid
- Who owes
- Settlement status
- Mark settled
- Settlement history

### Example

```text
Arun paid ₹4,000
Thiru owes ₹1,000
Karthi owes ₹1,000
Prasanna owes ₹1,000
```

Future enhancement: minimize the number of settlement transactions.

---

## 5.9 Shared Memories {#59-shared-memories}

### Features

- Photos
- Videos
- Notes
- Captions
- Location
- Date/time
- Member tagging
- Itinerary association
- Optional expense association

### Memory model

```text
Memory
├── Trip
├── Creator
├── Members
├── Location
├── Date/Time
├── Media
├── Note
├── Itinerary Item
└── Optional Expense
```

### Core concept

**Not \"My Photos\" --- \"Our Trip Memories\".**

---

## 5.10 Trip Activity Feed {#510-trip-activity-feed}

Important trip actions are recorded chronologically.

### Events

- Member joined
- Place added
- Itinerary changed
- Poll created
- Poll completed
- Expense added
- Expense settled
- Memory uploaded
- Document uploaded
- Trip updated

### Example

```text
10:30 — Arun added Athirapally Falls
11:15 — Karthi created a destination poll
12:05 — 6 members voted for Valparai
02:30 — Thiru added ₹2,450 hotel expense
```

The activity feed becomes the trip\'s chronological source of truth.

---

## 5.11 Route & Location {#511-route--location}

### Core

- Planned route
- Destination sequence
- Distance
- Estimated travel time
- Visited places
- Route history

### Phase 2

- Opt-in live location
- Group map
- Member location status
- Location sharing timer

### Privacy

- Explicit consent
- User-controlled sharing
- Visible status
- Optional expiry

---

## 5.12 Documents & Bookings {#512-documents--bookings}

### Documents

- Hotel bookings
- Tickets
- Permits
- Receipts
- Travel documents

### Features

- Upload
- Preview
- Download
- Delete
- Categorize
- Link to trip
- Link to itinerary

### Storage

Firebase Cloud Storage.

---

## 5.13 Checklists & Tasks {#513-checklists--tasks}

### Personal

- Clothes
- Charger
- ID
- Camera
- Personal items

### Group

- First-aid kit
- Common equipment
- Documents
- Emergency supplies

### Tasks

- Create
- Assign
- Due date
- Status
- Completion

---

## 5.14 Notifications {#514-notifications}

### Events

- Trip invitation
- Join request
- Poll created
- Poll result
- Itinerary change
- Expense added
- Settlement reminder
- Memory uploaded
- Upcoming activity
- Document added
- Trip starting soon

### Technology

Firebase Cloud Messaging.

---

## 5.15 Trip Sharing {#515-trip-sharing}

### Modes

**Private** --- invited members only\
**Link sharing** --- controlled link access\
**Public read-only** --- selected trip information

### Privacy controls

- Expense visibility
- Member visibility
- Memory visibility
- Document visibility
- Public/private status

---

## 5.16 Trip Capsule {#516-trip-capsule}

The final digital representation of a completed trip.

### Contains

- Trip overview
- Members
- Destinations
- Route
- Timeline
- Expenses
- Memories
- Photos
- Videos
- Highlights
- Statistics

### Example

```text
ATHIRAPALLY — VALPARAI 2026

8 Members
12 Places
324 KM
₹18,450
247 Photos
32 Videos
48 Memories
```

---

# 6. Core User Flows {#6-core-user-flows}

## Create Trip

```text
Login
→ Create Trip
→ Add Destination & Dates
→ Create
→ Invite Members
→ Trip Dashboard
```

## Plan Trip

```text
Trip
→ Search Places
→ Add Places
→ Create Itinerary
→ Create Poll
→ Vote
→ Finalize
```

## Expense

```text
Trip
→ Add Expense
→ Select Payer
→ Select Participants
→ Choose Split
→ Calculate Balance
→ Settle
```

## Memory

```text
Trip
→ Add Memory
→ Upload/Capture
→ Add Location
→ Tag Members
→ Add Note
→ Publish
```

## Complete Trip

```text
Trip Ends
→ Mark Completed
→ Compile Timeline
→ Compile Places
→ Compile Expenses
→ Compile Memories
→ Trip Capsule
```

---

# 7. Mobile Navigation {#7-mobile-navigation}

```text
Home
Trips
Create
Memories
Profile
```

## Trip Detail

```text
Overview
Itinerary
Places
Map
Expenses
Memories
Activity
Polls
Documents
Checklist
Members
```

---

# 8. Suggested Screen List {#8-suggested-screen-list}

## Authentication

1.  Splash
2.  Onboarding
3.  Login
4.  Register
5.  Forgot Password

## Home

6.  Home Dashboard
7.  Upcoming Trips
8.  Recent Trips
9.  Notifications

## Trip

10. Create Trip
11. Trip Overview
12. Trip Settings
13. Members
14. Invite Members

## Planning

15. Place Search
16. Place Details
17. Saved Places
18. Itinerary
19. Add Activity
20. Edit Activity
21. Poll List
22. Create Poll
23. Poll Details

## Expenses

24. Expense Dashboard
25. Add Expense
26. Expense Details
27. Balances
28. Settlement

## Memories

29. Memory Feed
30. Add Memory
31. Media Picker
32. Memory Details

## Travel

33. Map
34. Route
35. Location Sharing

## Documents

36. Documents
37. Upload Document
38. Document Preview

## Tasks

39. Checklist
40. Task Details

## History

41. Trip Timeline
42. Trip Capsule

## Profile

43. Profile
44. Settings
45. Privacy
46. Notifications
47. Account Management

---

# 9. Technology Stack {#9-technology-stack}

## Mobile

- React Native
- TypeScript

## Backend / Cloud {#backend--cloud}

- Firebase Authentication
- Cloud Firestore
- Firebase Cloud Functions
- Firebase Cloud Storage
- Firebase Cloud Messaging

## Maps

- Google Maps
- Google Places API
- Geolocation APIs

## Firebase Supporting Services

- Firebase Crashlytics
- Firebase Analytics
- Firebase Performance
- Firebase App Distribution

---

# 10. Architecture {#10-architecture}

```text
                    SAFNORA
                       |
              React Native App
                       |
              Firebase SDK Layer
                       |
      +----------------+----------------+
      |                |                |
 Firebase Auth    Cloud Firestore   Cloud Storage
      |                |                |
   Users          Trip Data          Media
   Sessions       Groups             Photos
                  Itinerary          Videos
                  Expenses           Docs
                  Memories          Receipts
                       |
              Firebase Cloud Functions
                       |
        +--------------+--------------+
        |              |              |
   Notifications   Business Logic   Automation
        |
       FCM
        |
   Mobile Devices

                       +
                       |
             Google Maps / Places API
```

---

# 11. Firestore Data Model {#11-firestore-data-model}

```text
users
trips
tripMembers
places
itineraries
polls
pollVotes
expenses
settlements
memories
activityFeed
documents
checklists
tasks
notifications
```

## User

```text
users/{userId}

id
name
email
photoUrl
phone
createdAt
updatedAt
status
```

## Trip

```text
trips/{tripId}

id
name
description
destination
coverImage
startDate
endDate
ownerId
status
privacy
createdAt
updatedAt
```

## Member

```text
trips/{tripId}/members/{userId}

userId
role
status
joinedAt
permissions
```

## Place

```text
trips/{tripId}/places/{placeId}

name
category
address
latitude
longitude
addedBy
priority
visited
notes
createdAt
```

## Itinerary

```text
trips/{tripId}/itinerary/{itemId}

day
title
description
location
startTime
endTime
order
status
createdBy
estimatedCost
```

## Expense

```text
trips/{tripId}/expenses/{expenseId}

title
category
amount
currency
paidBy
participants
splitType
location
receiptUrl
date
createdBy
status
```

## Memory

```text
trips/{tripId}/memories/{memoryId}

createdBy
members
mediaUrls
caption
note
location
latitude
longitude
createdAt
itineraryId
expenseId
```

## Activity

```text
trips/{tripId}/activity/{activityId}

type
actorId
targetId
message
metadata
createdAt
```

---

# 12. Storage Structure {#12-storage-structure}

```text
/users/{userId}/profile/
/trips/{tripId}/memories/
/trips/{tripId}/documents/
/trips/{tripId}/receipts/
/trips/{tripId}/cover/
```

---

# 13. Security & Privacy {#13-security--privacy}

## Authentication

- Firebase Authentication
- Protected navigation
- Session validation

## Firestore

Access should depend on:

- Trip membership
- Role
- Permissions
- Trip privacy

## Storage

- Member-based access
- File-size limits
- File-type validation
- Secure storage rules

## Location

- Explicit opt-in
- User-controlled
- Visible sharing state
- Optional expiry

## Data Protection

- Minimum necessary personal data
- Secure Firestore rules
- Input validation
- No private data through uncontrolled public links

---

# 14. Non-Functional Requirements {#14-non-functional-requirements}

## Performance

- Fast startup
- Pagination
- Lazy media loading
- Image compression
- Efficient Firestore queries

## Reliability

- Offline persistence where appropriate
- Retry handling
- Background synchronization
- Graceful failure handling

## Scalability

Architecture should support growth in:

- Users
- Trips
- Members
- Activity events
- Media

## Usability

- Mobile-first
- Simple navigation
- Clear actions
- Minimal steps
- Accessible touch targets

## Maintainability

- Feature-based React Native architecture
- Reusable components
- TypeScript models
- Central Firebase configuration

---

# 15. Competitive Differentiation {#15-competitive-differentiation}

Competitor research indicates that individual features such as itinerary
planning, maps, collaboration, expenses, route tracking and travel
memories already exist in different products.

Therefore SAFNORA should **not claim those individual features as
completely new**.

## Proposed differentiation

### 1. Trip as a Shared Workspace {#1-trip-as-a-shared-workspace}

All major trip activities are connected to one trip.

### 2. Trip Activity Feed {#2-trip-activity-feed}

Important trip actions become a chronological record.

### 3. Contextual Memories {#3-contextual-memories}

**Person + Place + Time + Media + Note + Optional Expense**

### 4. Decision-to-Action Workflow {#4-decision-to-action-workflow}

**Poll → Vote → Decision → Itinerary**

### 5. Trip Capsule {#5-trip-capsule}

The completed journey becomes one digital record.

---

# 16. MVP Scope {#16-mvp-scope}

## P0 --- Must Have {#p0--must-have}

- Authentication
- User profile
- Trip creation
- Group members
- Invitations
- Places
- Maps
- Itinerary
- Expenses
- Expense splitting
- Memories
- Activity feed
- Trip timeline
- Trip Capsule

## P1

- Polls
- Documents
- Checklists
- Notifications
- Route tracking
- Trip sharing

## P2

- Live location
- Offline enhancements
- Advanced trip history
- AI

## P3

- Booking integrations
- Travel partners
- Travel marketplace

---

# 17. SIH Prototype Demo Flow {#17-sih-prototype-demo-flow}

Use one complete story instead of isolated feature demonstrations.

### Example

**Salem → Athirapally → Valparai**

1.  Create trip
2.  Invite 5 members
3.  Add destinations
4.  Create destination poll
5.  Members vote
6.  Winning destination becomes itinerary item
7.  Add hotel expense
8.  Split expense
9.  Upload trip photos
10. Show activity feed
11. Show route
12. Complete trip
13. Generate Trip Capsule

This demonstrates the full product lifecycle.

---

# 18. Development Roadmap {#18-development-roadmap}

## Phase 0 --- Planning {#phase-0--planning}

- Requirements
- User flows
- UX
- Data model
- Architecture

## Phase 1 --- Foundation {#phase-1--foundation}

- React Native
- Firebase setup
- Authentication
- Navigation
- Profile

## Phase 2 --- Trip Core {#phase-2--trip-core}

- Trip creation
- Dashboard
- Members
- Invitations

## Phase 3 --- Planning {#phase-3--planning}

- Places
- Maps
- Itinerary
- Polls

## Phase 4 --- Finance {#phase-4--finance}

- Expenses
- Splits
- Balances
- Settlement

## Phase 5 --- Memories {#phase-5--memories}

- Media upload
- Memory feed
- Member tagging
- Activity feed

## Phase 6 --- History {#phase-6--history}

- Timeline
- Trip Capsule
- Sharing

## Phase 7 --- Quality {#phase-7--quality}

- Security rules
- Performance
- Offline testing
- Device testing
- Crash testing

## Phase 8 --- SIH Demo {#phase-8--sih-demo}

- Demo data
- End-to-end flow
- UI polish
- Presentation
- Rehearsal

---

# 19. Testing Strategy {#19-testing-strategy}

## Unit

- Expense calculations
- Split logic
- Validation
- Utilities

## Integration

- Firebase Auth
- Firestore
- Storage
- FCM
- Maps

## UI

- Navigation
- Forms
- Itinerary
- Expenses
- Memory upload

## Security

- Unauthorized trip access
- Unauthorized documents
- Member permissions
- Storage rules
- Public links

## Performance

- Large trips
- Large activity feed
- Multiple members
- Large media sets
- Slow networks

---

# 20. Acceptance Criteria {#20-acceptance-criteria}

## Trip

- User can create and edit a trip.
- User can invite members.
- Members can join.

## Planning

- Members can add places.
- Places display on map.
- Users can create itineraries.
- Members can vote on polls.

## Expenses

- User can add expense.
- Participants can be selected.
- System calculates balances.
- Settlement can be recorded.

## Memories

- User can upload media.
- User can add notes.
- Members can be tagged.
- Memory belongs to the correct trip.

## Activity

- Important actions are recorded.
- Actions appear chronologically.

## History

- Completed trip is accessible.
- Trip Capsule contains major trip information.

---

# 21. Risks & Mitigation {#21-risks--mitigation}

Risk Mitigation

---

Firebase cost growth Optimize reads, pagination and storage
Large media Compression and file limits
Poor connectivity Offline persistence and sync
Location privacy Explicit consent and controls
Concurrent updates Transactions and controlled writes
API limits Caching and optimized requests
UI complexity Progressive disclosure
Scope creep Strict MVP prioritization

---

# 22. Success Metrics {#22-success-metrics}

## Prototype

- Trip creation succeeds
- Members can join
- Itinerary can be created
- Expense split works
- Media uploads
- Activity feed updates
- Trip Capsule generates

## Future Product Metrics

- Trips created
- Active trips
- Members per trip
- Places per trip
- Expenses per trip
- Memories uploaded
- Poll participation
- Completed Trip Capsules
- Shared trips

---

# 23. Future Scope {#23-future-scope}

## AI

- AI itinerary suggestions
- Natural-language trip planning
- Smart recommendations
- AI trip summaries
- Automatic memory grouping

## Finance

- Receipt OCR
- Automatic expense extraction
- Multi-currency conversion
- Optimized settlements

## Travel

- Hotel integration
- Transport integration
- Activity booking
- Local guide integration

## Social

- Public travel profiles
- Community trips
- Travel stories
- Trip discovery

## Analytics

- Distance travelled
- Total expenditure
- Places visited
- Expense categories
- Travel statistics

---

# 24. Final Product Structure {#24-final-product-structure}

```text
SAFNORA
│
├── Authentication
├── User Profile
├── Trip Management
├── Group & Members
├── Places & Maps
├── Collaborative Itinerary
├── Polls & Decisions
├── Expenses & Settlement
├── Memories
├── Activity Feed
├── Documents & Bookings
├── Checklists & Tasks
├── Notifications
├── Route & Location
├── Trip Timeline
├── Trip Sharing
└── Trip Capsule
```

---

# 25. Recommended Build Priority {#25-recommended-build-priority}

Priority Module

---

P0 Authentication
P0 Trip Management
P0 Group & Members
P0 Places & Maps
P0 Itinerary
P0 Expenses
P0 Memories
P0 Activity Feed
P0 Trip Timeline
P0 Trip Capsule
P1 Polls
P1 Documents
P1 Checklists
P1 Notifications
P1 Route Tracking
P2 Live Location
P2 Offline Enhancements
P2 AI
P3 Booking Integrations
P3 Travel Marketplace

---

# 26. SIH Presentation Alignment {#26-sih-presentation-alignment}

The SIH 2026 template requires a maximum of **six slides including the
title slide**, recommends concise points/diagrams/infographics instead
of paragraphs, and requires submission as PDF.

The six-slide structure is:

1.  Title Page
2.  Idea / Proposed Solution
3.  Technical Approach
4.  Feasibility & Viability
5.  Impact & Benefits
6.  Research & References

The presentation should focus on the **problem → solution →
differentiation → technology → feasibility → impact** story.

---

# 27. Final Product Pitch {#27-final-product-pitch}

> **SAFNORA is a collaborative mobile travel platform that brings trip
> planning, group coordination, shared expenses, travel memories and
> complete trip history into one connected digital journey.**

## Product Lifecycle

**PLAN → COLLABORATE → MANAGE → EXPERIENCE → REMEMBER**

## Brand Meaning

**SAFNORA = SAFAR + AURA**

- **Safar** --- Journey
- **Aura** --- Experience, emotion and memories

### Tagline

> **Journeys Together. Memories Forever.**

---

# 28. Definition of Done --- SIH Prototype {#28-definition-of-done--sih-prototype}

The prototype is ready when a judge can follow this complete flow:

```text
LOGIN
 ↓
CREATE TRIP
 ↓
INVITE MEMBERS
 ↓
ADD DESTINATIONS
 ↓
CREATE ITINERARY
 ↓
CREATE POLL
 ↓
VOTE
 ↓
UPDATE ITINERARY
 ↓
ADD EXPENSE
 ↓
SPLIT EXPENSE
 ↓
UPLOAD MEMORY
 ↓
VIEW ACTIVITY
 ↓
VIEW ROUTE
 ↓
COMPLETE TRIP
 ↓
VIEW TRIP CAPSULE
```

> **Primary SIH demonstration goal:** show one complete journey from
> trip creation to post-trip memory rather than demonstrating
> disconnected screens.

---

# 29. Final Vision {#29-final-vision}

> **SAFNORA transforms group travel from a collection of disconnected
> apps and conversations into one connected digital journey --- from the
> first planning discussion to the final shared memory.**
