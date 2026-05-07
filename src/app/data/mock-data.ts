import { Project } from '../models/project.model';
import { Person } from '../models/person.model';
import { TimelineEvent } from '../models/timeline-event.model';
import { Decision } from '../models/decision.model';
import { Meeting } from '../models/meeting.model';

// Extended types for mock data that carry project associations
export type PersonEntry = Person & { projectIds: string[] };
export type TimelineEntry = TimelineEvent & { projectId: string };
export type DecisionEntry = Decision & { projectId: string };
export type MeetingEntry = Meeting & { projectId: string };

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'bdp-001',
    name: 'Borgernær Digital Platform',
    status: 'active',
    version: '2.3.1',
    lastActivity: new Date('2025-05-14'),
    nextMilestone: { title: 'Beta-release til pilotkommune', date: new Date('2025-06-01') },
    description:
      'En samlet digital platform der giver borgerne én indgang til kommunale selvbetjeningsydelser på tværs af forvaltningsområder.',
    background:
      'Projektet udspringer af en national digitaliseringsstrategi, der kræver at kommunerne samler borgerrettede digitale løsninger under ét. Den nuværende situation er præget af mange siloløsninger med dårlig brugeroplevelse og høje driftsomkostninger. Borgernær Digital Platform skal erstatte 12 eksisterende systemer og tilbyde en moderne, tilgængelig og mobil-venlig oplevelse for alle borgere.',
    goals: [
      'Samle 12 eksisterende selvbetjeningsløsninger i én platform',
      'Opnå WCAG 2.1 AA-tilgængelighed i alle brugerflader',
      'Reducere sagsbehandlingstid med 30% via automatiserede flows',
      'Integrere med NemID/MitID til sikker autentifikation',
      'Leve op til persondataforordningen (GDPR) for alle data-behandlinger',
    ],
    startDate: new Date('2023-09-01'),
    tags: ['borgerservice', 'digital-platform', 'API', 'selvbetjening'],
  },
  {
    id: 'im-002',
    name: 'Intranet Modernisering',
    status: 'paused',
    version: '1.1.0',
    lastActivity: new Date('2025-04-02'),
    nextMilestone: { title: 'Stakeholder review – ny informationsarkitektur', date: new Date('2025-05-28') },
    description:
      'Modernisering af det interne intranet med fokus på bedre videndeling, søgbarhed og integration med Microsoft 365-platformen.',
    background:
      'Det nuværende intranet er bygget på en 11 år gammel SharePoint-installation og lever ikke op til medarbejdernes forventninger til et moderne digitalt arbejdsmiljø. Projektet er midlertidigt sat på pause grundet prioritering af borgernær platform, men genoptages Q3 2025 med et nyt projekt-charter.',
    goals: [
      'Migrere indhold til SharePoint Online og Microsoft Viva',
      'Implementere AI-drevet søgning med Microsoft Copilot',
      'Etablere governance-model for intranet-indhold',
      'Forbedre mobiloplevelsen for feltmedarbejdere',
    ],
    startDate: new Date('2024-02-01'),
    tags: ['intranet', 'SharePoint', 'M365', 'videndeling'],
  },
  {
    id: 'dih-003',
    name: 'Data Integration Hub',
    status: 'active',
    version: '3.0.0-beta',
    lastActivity: new Date('2025-05-15'),
    nextMilestone: { title: 'v3.0 produktionsrelease', date: new Date('2025-05-30') },
    description:
      'Central dataintegrationsplatform der forbinder fagsystemer, datalagre og analyseredskaber på tværs af forvaltningen.',
    background:
      'Forvaltningen opererer med over 40 fagsystemer med begrænset dataudveksling. Det medfører manuel dobbeltregistrering, inkonsistente data og manglende grundlag for datadrevet ledelse. Data Integration Hub etablerer en event-drevet integrationsarkitektur baseret på Apache Kafka og REST API-gateway, der muliggør realtidsintegration og auditering af alle dataflows.',
    goals: [
      'Forbinde de 8 mest kritiske fagsystemer i første fase',
      'Etablere et fælles datakataloG med DCAT-metadata',
      'Implementere end-to-end auditering af alle dataoverførsler',
      'Reducere manuel dobbeltregistrering med 80%',
      'Understøtte GDPR-krav med dataminimering og slettepolitikker',
    ],
    startDate: new Date('2024-06-01'),
    tags: ['data', 'integration', 'API', 'Kafka', 'automatisering'],
  },
];

// ─── People ───────────────────────────────────────────────────────────────────

export const PEOPLE: PersonEntry[] = [
  {
    id: 'p-001',
    name: 'Lars Nielsen',
    initials: 'LN',
    role: 'Tech Lead',
    contributions: ['Systemarkitektur', 'API-design', 'Kode-reviews'],
    workload: 'high',
    availability: 'Fuldt besat frem til 1. juni',
    projectIds: ['bdp-001', 'dih-003'],
  },
  {
    id: 'p-002',
    name: 'Sofie Andersen',
    initials: 'SA',
    role: 'Product Owner',
    contributions: ['Backlog-prioritering', 'Stakeholder-dialog', 'Krav-specifikation'],
    workload: 'medium',
    availability: 'Tilgængelig',
    projectIds: ['bdp-001'],
  },
  {
    id: 'p-003',
    name: 'Mikkel Christensen',
    initials: 'MC',
    role: 'Backend Developer',
    contributions: ['REST API', 'Databasemodellering', 'Performance-optimering'],
    workload: 'medium',
    availability: 'Tilgængelig',
    projectIds: ['dih-003', 'bdp-001'],
  },
  {
    id: 'p-004',
    name: 'Anna Hansen',
    initials: 'AH',
    role: 'UX Designer',
    contributions: ['Brugerresearch', 'Prototyping', 'Tilgængelighed'],
    workload: 'low',
    availability: 'Tilgængelig fra 19. maj',
    projectIds: ['im-002', 'bdp-001'],
  },
  {
    id: 'p-005',
    name: 'Rasmus Pedersen',
    initials: 'RP',
    role: 'Data Engineer',
    contributions: ['Datapipelines', 'Kafka-integration', 'Datakatalog'],
    workload: 'high',
    availability: 'Fuldt besat frem til v3.0-release',
    projectIds: ['dih-003'],
  },
  {
    id: 'p-006',
    name: 'Emma Møller',
    initials: 'EM',
    role: 'Scrum Master',
    contributions: ['Sprint-facilitering', 'Retrospektiver', 'Impediment-håndtering'],
    workload: 'unavailable',
    availability: 'Tilgængelig igen 2. juni (forældreorlov)',
    projectIds: ['im-002'],
  },
];

// ─── Timeline Events ──────────────────────────────────────────────────────────

export const TIMELINE_EVENTS: TimelineEntry[] = [
  {
    id: 'te-001',
    projectId: 'bdp-001',
    type: 'milestone',
    title: 'Alpha-release godkendt af styregruppe',
    date: new Date('2025-03-15'),
    notes: 'Styregruppen godkendte alpha-versionen med 3 mindre reservationer vedr. tilgængelighed.',
    aiSummary:
      'Alpha-versionen af platformen blev godkendt til videre udvikling. Styregruppen noterede tre konkrete tilgængeligheds-issues der skal adresseres inden beta.',
  },
  {
    id: 'te-002',
    projectId: 'bdp-001',
    type: 'meeting',
    title: 'Sprint 14 Review',
    date: new Date('2025-04-28'),
    attendees: ['Lars Nielsen', 'Sofie Andersen', 'Anna Hansen', 'Mikkel Christensen'],
    aiSummary:
      'Teamet demonstrerede den nye notifikationsmodul og ansøgningsflow for byggetilladelser. Sofie identificerede 2 nye brugerhistorier baseret på feedback fra pilottest.',
  },
  {
    id: 'te-003',
    projectId: 'bdp-001',
    type: 'release',
    title: 'Version 2.3.0 frigivet',
    date: new Date('2025-05-02'),
    notes: 'Inkluderer ny søgefunktionalitet, forbedret MitID-flow og 47 bug-fixes.',
    aiSummary:
      'Release 2.3.0 indeholder markante forbedringer til søgning og autentifikation. Deployment forløb uden incidents.',
  },
  {
    id: 'te-004',
    projectId: 'bdp-001',
    type: 'decision',
    title: 'Beslutning: Skift til Azure API Management',
    date: new Date('2025-05-10'),
    aiSummary: 'Arkitekturgruppen besluttede at erstatte den eksisterende Kong-gateway med Azure APIM for bedre integration med det øvrige Microsoft-miljø og reducerede driftsomkostninger.',
  },
  {
    id: 'te-005',
    projectId: 'im-002',
    type: 'milestone',
    title: 'Projekt sat på pause – prioriteringsafgørelse',
    date: new Date('2025-04-02'),
    notes: 'Direktionen besluttede at pause projektet frem til Q3 2025 pga. ressourcepres på BDP.',
    aiSummary: 'Direktionen har besluttet at prioritere Borgernær Digital Platform og sætte Intranet Modernisering på pause frem til Q3. Projektet bevarer sit projektcharter og genoptages med samme team.',
  },
  {
    id: 'te-006',
    projectId: 'im-002',
    type: 'meeting',
    title: 'Informationsarkitektur workshop',
    date: new Date('2025-03-10'),
    attendees: ['Anna Hansen', 'Emma Møller', 'Sofie Andersen'],
    aiSummary: 'Workshop med 12 medarbejdere fra tværs af forvaltningen kortlagde behovet for ny intranet-struktur. Tre overordnede informationsdomæner blev identificeret.',
  },
  {
    id: 'te-007',
    projectId: 'dih-003',
    type: 'release',
    title: 'Version 2.9.0 – Kafka-opgradering',
    date: new Date('2025-04-18'),
    notes: 'Opgradering til Kafka 3.7 med ny consumer-group logik.',
    aiSummary: 'Kafka-opgraderingen forløb planmæssigt med 45 minutters planlagt nedetid. Alle 8 integrationer verificeret post-deployment.',
  },
  {
    id: 'te-008',
    projectId: 'dih-003',
    type: 'decision',
    title: 'Beslutning: Adopt event sourcing for audit trail',
    date: new Date('2025-05-08'),
    aiSummary: 'Lars og Rasmus præsenterede en proof-of-concept for event sourcing som erstatning for den nuværende audit-log løsning. Besluttet at implementere i v3.0.',
  },
  {
    id: 'te-009',
    projectId: 'dih-003',
    type: 'milestone',
    title: 'v3.0 beta deployeret til staging',
    date: new Date('2025-05-12'),
    notes: 'Staging-deployment gennemført. Lasttest pågår frem til 22. maj.',
    aiSummary: 'v3.0 beta er nu på staging-miljøet. Alle nye features er funktionelle. Lasttest viser 99.7% uptime ved simuleret peak-load.',
  },
];

// ─── Decisions ────────────────────────────────────────────────────────────────

export const DECISIONS: DecisionEntry[] = [
  {
    id: 'd-001',
    projectId: 'bdp-001',
    title: 'Skift til Azure API Management som gateway',
    date: new Date('2025-05-10'),
    description:
      'Eksisterende Kong API Gateway erstattes med Azure API Management for at reducere driftsomkostninger og forenkle integrationen med det øvrige Microsoft-cloudmiljø. Migrationsplan udarbejdes i Sprint 15.',
    madeBy: ['Lars Nielsen', 'Sofie Andersen'],
    sourceLink: 'https://teams.microsoft.com/bdp-arkitektur',
    sourceType: 'Teams',
  },
  {
    id: 'd-002',
    projectId: 'bdp-001',
    title: 'WCAG 2.1 AA som minimumskrav for alle komponenter',
    date: new Date('2025-02-20'),
    description:
      'Alle brugervendte komponenter skal leve op til WCAG 2.1 AA inden release til produktion. Automatisk tilgængeligheds-scanning integreres i CI/CD pipeline.',
    madeBy: ['Sofie Andersen', 'Anna Hansen'],
    sourceLink: 'https://sharepoint.com/sites/bdp/decisions',
    sourceType: 'SharePoint',
  },
  {
    id: 'd-003',
    projectId: 'bdp-001',
    title: 'Brug Angular standalone components (v17+)',
    date: new Date('2024-11-05'),
    description:
      'Hele frontend-stacken opgraderes til Angular 17 med standalone components og signals API for bedre performance og enklere arkitektur.',
    madeBy: ['Lars Nielsen'],
    sourceLink: 'https://jira.kommune.dk/BDP-214',
    sourceType: 'Jira',
  },
  {
    id: 'd-004',
    projectId: 'im-002',
    title: 'Microsoft Viva Connections som intranet-platform',
    date: new Date('2025-02-14'),
    description:
      'Efter evaluering af 4 platforme vælges Microsoft Viva Connections pga. eksisterende M365-licensering og tæt integration med Teams. SharePoint Online bruges som backend.',
    madeBy: ['Anna Hansen', 'Emma Møller'],
    sourceLink: 'https://sharepoint.com/sites/im/decisions',
    sourceType: 'SharePoint',
  },
  {
    id: 'd-005',
    projectId: 'im-002',
    title: 'Projekt pauses frem til Q3 2025',
    date: new Date('2025-04-02'),
    description:
      'Direktionen besluttede at sætte projektet på pause grundet kapacitetspres. Alle dokumenter bevares og projektet genoptages med samme scope i Q3 2025.',
    madeBy: ['Direktionen'],
    sourceType: 'Manual',
  },
  {
    id: 'd-006',
    projectId: 'dih-003',
    title: 'Event sourcing til audit trail i v3.0',
    date: new Date('2025-05-08'),
    description:
      'Den nuværende CRUD-baserede audit-log erstattes med event sourcing. Alle state-ændringer logges som uforanderlige events i en separat event store. Giver fuld auditability og mulighed for tidsmaskine-queries.',
    madeBy: ['Lars Nielsen', 'Rasmus Pedersen'],
    sourceLink: 'https://jira.kommune.dk/DIH-456',
    sourceType: 'Jira',
  },
  {
    id: 'd-007',
    projectId: 'dih-003',
    title: 'Apache Kafka 3.7 med KRaft mode (uden ZooKeeper)',
    date: new Date('2025-04-15'),
    description:
      'ZooKeeper udfases til fordel for Kafkas native KRaft consensus-protokol. Reducerer infrastrukturkompleksitet og forbedrer startup-tider markant.',
    madeBy: ['Rasmus Pedersen'],
    sourceLink: 'https://jira.kommune.dk/DIH-412',
    sourceType: 'Jira',
  },
];

// ─── Meetings ─────────────────────────────────────────────────────────────────

export const MEETINGS: MeetingEntry[] = [
  {
    id: 'm-001',
    projectId: 'bdp-001',
    title: 'Sprint 14 Review & Retrospektiv',
    date: new Date('2025-04-28'),
    attendees: ['Lars Nielsen', 'Sofie Andersen', 'Anna Hansen', 'Mikkel Christensen'],
    aiSummary:
      'Teamet demonstrerede notifikationsmodulet og det nye ansøgningsflow for byggetilladelser. Brugertest fra pilotkommune viste generelt positiv modtagelse, men identificerede 3 UX-problemer i dokumentupload-flowet. Retrospektivet fokuserede på at reducere tid brugt på manuelle deployment-steps. Action items: (1) Sofie undersøger ny brugerhistorie for digitalt aktindsigt. (2) Lars sætter CI/CD-forbedringer på backlog. (3) Anna reviderer upload-komponent til næste sprint.',
    transcriptAvailable: true,
    sourceLink: 'https://teams.microsoft.com/bdp-sprint14',
  },
  {
    id: 'm-002',
    projectId: 'bdp-001',
    title: 'Arkitektur-review: Azure APIM migration',
    date: new Date('2025-05-10'),
    attendees: ['Lars Nielsen', 'Sofie Andersen'],
    aiSummary:
      'Lars præsenterede en detaljeret migrationsplan fra Kong til Azure APIM. Estimeret migrationsvindue: 2 sprints. Sofie godkendte planen og sikrer buy-in fra styregruppen. Beslutning truffet om at starte migration i Sprint 16.',
    transcriptAvailable: false,
    sourceLink: 'https://teams.microsoft.com/bdp-arkitektur',
  },
  {
    id: 'm-003',
    projectId: 'bdp-001',
    title: 'Sprint 15 Planning',
    date: new Date('2025-05-12'),
    attendees: ['Lars Nielsen', 'Sofie Andersen', 'Anna Hansen', 'Mikkel Christensen'],
    aiSummary:
      'Sprint 15 fokuserer på APIM-migrationsplan, tilgængeligheds-fixes og beta-release forberedelse. Teamet tog 42 story points ind. Største usikkerhed er afhængighed af IT-infrastruktur for APIM-opsætning.',
    transcriptAvailable: false,
  },
  {
    id: 'm-004',
    projectId: 'im-002',
    title: 'Informationsarkitektur workshop – dag 1',
    date: new Date('2025-03-10'),
    attendees: ['Anna Hansen', 'Emma Møller', 'Sofie Andersen'],
    aiSummary:
      'Workshop med 12 repræsentanter fra 5 forvaltningsenheder kortlagde behov og frustrationer med nuværende intranet. Tre primære informationsdomæner identificeret: (1) Nyheder og kommunikation, (2) Politikker og vejledninger, (3) Projekter og samarbejde. Card-sorting øvelse viste bred enighed om ny navigation. Aftenens output: udkast til ny sitemap-struktur klar til review.',
    transcriptAvailable: true,
    sourceLink: 'https://teams.microsoft.com/im-workshop',
  },
  {
    id: 'm-005',
    projectId: 'dih-003',
    title: 'v3.0 Beta Review – teknisk gennemgang',
    date: new Date('2025-05-13'),
    attendees: ['Lars Nielsen', 'Rasmus Pedersen', 'Mikkel Christensen'],
    aiSummary:
      'Beta-reviewet gennemgik alle 8 integrationer i v3.0. Kafka-event sourcing fungerer stabilt. Lasttest viser p99-latency på 42ms ved 10.000 events/sek. Ét kritisk issue identificeret: race condition i consumer-group rebalancing ved deployment. Rasmus estimerer 2-dages fix. Release dato fastholdes til 30. maj såfremt fix lander inden 22. maj.',
    transcriptAvailable: true,
    sourceLink: 'https://teams.microsoft.com/dih-v3beta',
  },
  {
    id: 'm-006',
    projectId: 'dih-003',
    title: 'Datakatalog governance møde',
    date: new Date('2025-04-22'),
    attendees: ['Rasmus Pedersen', 'Sofie Andersen'],
    aiSummary:
      'Mødet etablerede governance-model for det nye datakatalog. Aftalt at alle datasæt skal have en navngiven dataejer. DCAT-AP metadata-skema godkendt som standard. Rasmus udarbejder onboarding-guide til dataejere inden udgangen af april.',
    transcriptAvailable: false,
  },
];

// ─── AI Summaries (per project) ───────────────────────────────────────────────

export const AI_SUMMARIES: Record<string, string> = {
  'bdp-001': `Borgernær Digital Platform er et større digitaliseringsprojekt i den kommunale forvaltning, der samler borgernes adgang til selvbetjening under ét tag. Projektet er startede i efteråret 2023 og er i skrivende stund i aktiv udvikling med version 2.3.1 i produktion.

Teknisk set er platformen bygget som en moderne single-page application med Angular og en REST API-gateway, der integrerer 12 eksisterende fagsystemer. MitID er implementeret til sikker autentifikation, og der er et stærkt fokus på tilgængelighed (WCAG 2.1 AA).

Teamet arbejder i 2-ugers sprints og er godt på vej mod en beta-release til pilotkommune i starten af juni. Den nærmeste udfordring er en planlagt migration fra Kong API Gateway til Azure API Management, som forventes gennemført i Sprint 16.

Projektet er veldokumenteret og har et engageret team med klar rollefordeling.`,

  'im-002': `Intranet Modernisering er et projekt der skal erstatte et 11 år gammelt SharePoint-intranet med en moderne medarbejderplatform baseret på Microsoft Viva Connections og SharePoint Online.

Projektet er aktuelt sat på pause frem til Q3 2025 som følge af en prioriteringsafgørelse fra direktionen, der valgte at fokusere kapaciteten på Borgernær Digital Platform. Projektets charter og al dokumentation er bevaret, og genoptagelse er planlagt med det samme team.

Inden pausen nåede projektet at gennemføre en vellykkede informationsarkitektur-workshop med 12 medarbejder-repræsentanter og træffe platformsvalget om Microsoft Viva. Den næste planlagte aktivitet er et stakeholder-review af den nye informationsarkitektur.

Ny projektstarter er estimeret til august 2025.`,

  'dih-003': `Data Integration Hub er forvaltningens centrale integrationsplatform, der forbinder over 40 fagsystemer via en event-drevet arkitektur baseret på Apache Kafka og et REST API-gateway.

Platformen er i aktiv drift med version 2.x og er tæt på at release version 3.0, der introducerer event sourcing til fuld auditering af alle dataoverførsler, opgradering til Kafka 3.7 med KRaft mode og et nyt datakatalog med DCAT-AP metadata.

v3.0 beta er deployeret på staging og lasttest viser stærke tal (p99-latency på 42ms ved 10.000 events/sek). Ét kritisk issue med race condition ved rebalancing er under løsning af Rasmus Pedersen.

Produktionsrelease er planlagt til 30. maj, forudsat at det identificerede issue løses inden 22. maj.`,
};
