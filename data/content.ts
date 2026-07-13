import { Skill, ExperienceItem, TranslationDictionary, Quest, Project } from '../types';

export const SKILLS: Skill[] = [
    // Automation
    { id: 'selenium', name: 'Selenium', level: 95, category: 'automation', icon: 'Bot', isMastered: true },
    { id: 'manualtesting', name: 'Manual Testing', level: 95, category: 'testing', icon: 'ClipboardCheck', isMastered: true },
    { id: 'appium', name: 'Appium', level: 90, category: 'automation', icon: 'Smartphone', isMastered: true },
    { id: 'testinium', name: 'Testinium', level: 85, category: 'automation', icon: 'TestTube', isMastered: false },
    { id: 'browserstack', name: 'Browserstack', level: 85, category: 'automation', icon: 'Globe', isMastered: false },

    // Languages & Frameworks
    { id: 'java', name: 'Java', level: 90, category: 'languages', icon: 'Coffee', isMastered: true },
    { id: 'python', name: 'Python', level: 80, category: 'languages', icon: 'FileCode', isMastered: false },
    { id: 'cucumber', name: 'Cucumber', level: 85, category: 'languages', icon: 'Sprout', isMastered: false },
    { id: 'gauge', name: 'Gauge', level: 85, category: 'languages', icon: 'Gauge', isMastered: false },

    // API
    { id: 'postman', name: 'Postman', level: 95, category: 'api', icon: 'Send', isMastered: true },
    { id: 'soapui', name: 'SOAP UI', level: 80, category: 'api', icon: 'FileJson', isMastered: false },
    { id: 'swagger', name: 'Swagger', level: 85, category: 'api', icon: 'BookOpen', isMastered: false },

    // CI/CD & Management
    { id: 'azure', name: 'Azure', level: 85, category: 'devops', icon: 'Cloud', isMastered: false },
    { id: 'jira', name: 'Jira', level: 80, category: 'tracking', icon: 'Trello', isMastered: true },
    { id: 'tfs', name: 'TFS', level: 85, category: 'tracking', icon: 'GitMerge', isMastered: false },
    { id: 'sql', name: 'SQL', level: 80, category: 'languages', icon: 'Database', isMastered: false },

    // Modern & AI-Assisted Testing
    { id: 'playwright', name: 'Playwright', level: 90, category: 'automation', icon: 'Drama', isMastered: true },
    { id: 'typescript', name: 'TypeScript', level: 75, category: 'languages', icon: 'Braces', isMastered: false },
    { id: 'git', name: 'Git', level: 85, category: 'devops', icon: 'GitBranch', isMastered: false },
    { id: 'apitesting', name: 'API Testing', level: 90, category: 'api', icon: 'Webhook', isMastered: true },
    { id: 'aitesting', name: 'AI/LLM Testing', level: 85, category: 'automation', icon: 'Brain', isMastered: false },
];

interface ContentData {
    translations: TranslationDictionary;
    experience: ExperienceItem[];
    projects: Project[];
    quests: Quest[];
    logs: string[];
}

export const CONTENT: Record<string, ContentData> = {
    en: {
        translations: {
            role: '"Software QA Engineer"',
            summary: 'Software QA Engineer with 7+ years of experience across banking, e-commerce, and mobile app projects, covering both manual and automated testing end to end. My current focus: integrating AI into testing workflows. I initiated test automation at my current company and built an LLM-as-a-Judge system that tests a production AI chatbot with 400+ scenarios.',
            runTests: 'Run Test Suite',
            viewSpecs: 'View Specs',
            experience: 'EXPERIENCE',
            frameworks: 'FRAMEWORKS',
            methodology: 'METHODOLOGY',
            expLabel: '7+ Years',
            testingLabel: 'Web & Mobile Testing',
            agileLabel: 'Agile / Scrum',
            aboutMe: 'About Me',
            education: 'Education & Certifications',
            bachelor: "Bachelor's Degree in Electronics Teaching",
            bachelorDesc: 'Kocaeli University — 2016',
            cs50: 'CS50x: Intro to Computer Science',
            cs50Desc: 'Harvard University (edX) — 2025',
            skillsTitle: 'Test Specifications (Skills)',
            suiteStability: 'Suite Stability',
            lastRun: 'Last Run: PASS',
            deploymentLog: 'deployment_history.log',
            viewProject: 'View Project Details',
            hideDetails: 'Hide Details',
            keyAccomplishments: 'Key Accomplishments',
            impact: 'Impact:',
            contactReq: 'New Ticket: Contact Request',
            reporter: 'Reporter (Name)',
            email: 'Contact Email',
            message: 'Description (Message)',
            submit: 'Submit Ticket',
            sentSuccess: 'Message sent successfully!',
            navOverview: 'overview',
            navAbout: 'about_me',
            navSkills: 'skills',
            navHistory: 'work_history',
            navContact: 'contact',
            navProjects: 'projects',
            projectsTitle: 'Featured Projects',
            featuredLabel: 'Featured',
            viewCode: 'View Code',
            liveReport: 'Live Report',
            viewProjects: 'View Projects',
            projectsSeoTitle: 'Projects | AI-Assisted QA & Test Automation',
            projectsSeoDesc: "Selected projects by Turan Aymis: an LLM-as-a-Judge AI chatbot test framework, an AI-assisted Playwright QA framework, and the VentoRideSafety mobile app.",
            extDeps: 'External Dependencies',
            serverOnline: 'Server: Online',
            termReady: 'Ready',
            termHeader: 'Terminal — Local — zsh',
            termPlaceholder: "Type 'help' for commands...",
            termHelpIntro: 'Available commands:',
            termHelpRunTests: 'Execute automation suite',
            termHelpGoto: 'Navigate (home, about, skills, exp, projects, contact)',
            termHelpWhoami: 'Profile info',
            termHelpClear: 'Clear terminal',
            testLLMJudgeRun: 'Running LLM-as-a-Judge scenario pack: 400+ Q&A pairs...',
            testLLMJudgePass: 'All chatbot responses validated',
            cmdRunTestsDesc: 'Execute suite',
            cmdGotoDesc: 'Navigate',
            cmdWhoamiDesc: 'Profile info',
            cmdHelpDesc: 'List cmds',
            hints: [
                "Try 'goto projects' to see my AI testing work",
                "There's a hidden bug in the UI... can you find it?",
                "Complete quests to earn XP",
                "Press Ctrl+K for the command palette"
            ],
            workspaceTitle: 'QA_WORKSPACE',
            portfolioProject: 'Portfolio_Project',
            downloadCV: 'Download CV',
            downloadResume: 'Download Full Resume',
            reportIssue: 'Report Issue',
            openCmdPalette: 'Open command palette',
            cmdPalettePlaceholder: 'Type a command or search...',
            cmdPaletteHelp: '↑↓ navigate · Enter select · Esc close',
            level: 'Player Level',
            activeQuest: 'Active Quest',
            allComplete: 'All quests complete!',
            coverage: 'Coverage',
            badges: 'Badges',
            sysCmds: 'System Commands',
            hintSys: 'Hint System',
            achUnlocked: 'Unlocked',
            levelUp: 'Level Up',
            questComp: 'Complete',
            clickDismiss: 'Dismiss',
            charSheet: 'CHARACTER_SHEET.md',
            stats: 'Attributes',
            lore: 'Character Lore',
            inventory: 'Inventory',
            equipped: 'Equipped',
            attributes: {
                int: 'Intelligence',
                wis: 'Wisdom',
                cha: 'Charisma',
                dex: 'Dexterity'
            },
            missionStart: 'INITIALIZE SEQUENCE',
            missionBrief: 'MISSION BRIEFING',
            sysStatus: 'SYSTEM STATUS',
            playerReady: 'PLAYER READY',
            currentObj: 'CURRENT OBJECTIVE',
            commsTitle: 'SECURE UPLINK // TRANSMISSION CONSOLE',
            signalStrength: 'SIGNAL STRENGTH',
            encryption: 'ENCRYPTION: AES-256 [ACTIVE]',
            transmitting: 'TRANSMITTING DATA...',
            sourceId: 'SOURCE_ID (NAME)',
            commFreq: 'COMM_FREQUENCY (EMAIL)',
            dataPayload: 'DATA_PAYLOAD (MESSAGE)',
            initiateUpload: 'INITIATE DATA UPLOAD'
        },
        experience: [
            {
                id: 'monster',
                role: 'Software QA Engineer',
                company: 'Monster Notebook',
                period: 'Sep 2021 – Present',
                location: 'Istanbul, Turkey',
                description: [
                    "I run the testing processes for Monster Notebook's e-commerce platform (4 country sites and iOS/Android apps). I initiated test automation at the company.",
                    "Set up the first web test automation using TestProject; after the transition to Testinium infrastructure, developed all site automation scenarios myself with Java, Selenium, and Gauge.",
                    "Self-taught Python and Playwright, then built the test automation for the company's AI chatbot agent from scratch: 400+ Q&A pairs from a JSON dataset, automated querying, LLM-as-a-Judge evaluation with pass/fail verdicts and reasoning, Allure reporting with screenshots, Excel export.",
                    "Create test plans, test cases, and end-to-end scenarios based on user stories.",
                    "Perform API testing with Postman.",
                    "Run functional, regression, and E2E tests of the mobile apps on real devices and BrowserStack.",
                    "Track and document defects in Azure DevOps."
                ],
                techStack: ['Selenium', 'Appium', 'Java', 'Azure', 'Postman'],
                projects: [
                    {
                        title: "Test Automation Architecture",
                        desc: "Designed and implemented web and mobile test automation systems for various platforms.",
                        impact: "Streamlined collaboration using Azure remote repository.",
                        testStrategy: {
                            automationFramework: 'Selenium & Appium',
                            testScope: 'E2E + Regression',
                            testCoverage: 92
                        }
                    },
                    {
                        title: "Critical Project Testing",
                        desc: "Performed Regression, Integration, and E2E testing for critical releases.",
                        impact: "Authored detailed documentation for software defects to ensure quality.",
                        testStrategy: {
                            automationFramework: 'Postman (API) / Manual',
                            testScope: 'API Integration',
                            testCoverage: 85
                        }
                    }
                ]
            },
            {
                id: 'dogus',
                role: 'QA Team Lead',
                company: 'Doğuş Teknoloji (via Quality Museum)',
                period: 'May 2021 – Sep 2021',
                location: 'Istanbul, Turkey',
                description: [
                    "Led a team of 4 QA engineers on Doğuş Group's Zubizu mobile app (iOS/Android) as QA Team Lead.",
                    "Created the project's master test plan and structured the testing processes.",
                    "Built the standard test case template used across the team.",
                    "Set up tracking of test scenarios and tasks in Azure DevOps.",
                    "Managed the handover of regression scenarios to the automation team.",
                    "Ran one-on-ones and workload planning with team members."
                ],
                techStack: ['Mobile Testing', 'Azure', 'Test Management', 'Zubizu'],
                projects: [
                    {
                        title: "Zubizu QA Leadership",
                        desc: "Managed the test team and established comprehensive testing strategies.",
                        impact: "Delivered seamless testing processes and quality deliverables.",
                        testStrategy: {
                            automationFramework: 'Azure DevOps',
                            testScope: 'Process Management',
                            testCoverage: 100
                        }
                    },
                    {
                        title: "Process Optimization",
                        desc: "Created reusable templates for test cases and reviewed test documentation.",
                        impact: "Supported backlog refinement with actionable test items.",
                        testStrategy: {
                            automationFramework: 'Manual / Azure',
                            testScope: 'Documentation',
                            testCoverage: 88
                        }
                    }
                ]
            },
            {
                id: 'akbank',
                role: 'Software QA Engineer',
                company: 'Akbank via Netaş',
                period: 'Sep 2018 – May 2021',
                location: 'Istanbul, Turkey',
                description: [
                    "Worked as a QA Engineer on mobile banking projects at Akbank (Akbank Mobile and Axess iOS/Android apps).",
                    "Performed UI and E2E integration testing of the mobile applications.",
                    "Wrote test scenarios based on analysis documents and managed them in TFS.",
                    "Conducted web service testing with SOAP UI.",
                    "Supported regression testing and user acceptance testing (UAT) processes.",
                    "Created and maintained test data sets; managed defect reporting and tracking."
                ],
                techStack: ['Mobile Banking', 'TFS', 'SOAP UI', 'SQL'],
                projects: [
                    {
                        title: "Mobile Banking Validation",
                        desc: "Performed manual and regression testing for mobile applications and maintained datasets.",
                        impact: "Maintained functionality and usability across Akbank mobile apps.",
                        testStrategy: {
                            automationFramework: 'UFT / Manual',
                            testScope: 'Functional / UAT',
                            testCoverage: 91
                        }
                    },
                    {
                        title: "Backend Integration",
                        desc: "Conducted web service testing using SOAP UI for robust backend validation.",
                        impact: "Integrated test scenarios based on analysis documents into TFS.",
                        testStrategy: {
                            automationFramework: 'SOAP UI',
                            testScope: 'Backend API',
                            testCoverage: 94
                        }
                    }
                ]
            }
        ],
        projects: [
            {
                id: 'llm-judge',
                name: 'LLM-as-a-Judge — AI Chatbot Test Framework',
                description: 'Open-source version of a system I built to test a production AI chatbot agent. Reads 400+ Q&A pairs from a JSON dataset, automatically queries the chatbot, evaluates responses using an LLM-as-a-Judge approach, and delivers pass/fail verdicts with reasoning. Provider-agnostic judge layer (OpenAI/Gemini), Allure reporting with screenshots, Excel export.',
                tags: ['Playwright', 'Pytest', 'Python', 'OpenAI', 'Gemini', 'Allure'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/llm-judge-chatbot-testing' }
                ],
                featured: true
            },
            {
                id: 'playwright-framework',
                name: 'AI-Assisted Playwright QA Framework',
                description: 'E2E test framework built with Playwright + TypeScript: POM architecture, GitHub Actions CI, and a live HTML test report auto-published to GitHub Pages on every push.',
                tags: ['Playwright', 'TypeScript', 'GitHub Actions', 'POM', 'CI/CD'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/ai-assisted-playwright-qa-framework' },
                    { type: 'live', url: 'https://turanaymis.github.io/ai-assisted-playwright-qa-framework/' }
                ]
            },
            {
                id: 'ventoridesafety',
                name: 'VentoRideSafety',
                description: 'Mobile app for motorcyclists that assesses weather conditions and riding risk. Built with React Native + Expo, developed with AI-assisted tooling. Preparing for App Store and Google Play release.',
                tags: ['React Native', 'Expo', 'Mobile', 'AI-Assisted Development'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/VentoRideSafety' }
                ]
            }
        ],
        quests: [
            {
                id: 'q1',
                title: 'Cypress Scout',
                description: 'Explore any 3 pages of the portfolio',
                target: 3,
                current: 0,
                rewardXp: 50,
                isCompleted: false
            },
            {
                id: 'q2',
                title: 'Bug Hunter',
                description: 'Find and report the hidden UI bug.',
                target: 1,
                current: 0,
                rewardXp: 150,
                isCompleted: false
            },
            {
                id: 'q3',
                title: 'Console Cowboy',
                description: 'Execute a valid command in the Terminal.',
                target: 1,
                current: 0,
                rewardXp: 75,
                isCompleted: false
            },
            {
                id: 'q4',
                title: 'Polyglot Tester',
                description: 'Toggle the language selector at least once.',
                target: 1,
                current: 0,
                rewardXp: 50,
                isCompleted: false
            },
            {
                id: 'q5',
                title: 'Recruiter Protocol',
                description: "Click the 'Download CV' button or LinkedIn link.",
                target: 1,
                current: 0,
                rewardXp: 100,
                isCompleted: false
            },
            {
                id: 'q6',
                title: 'Grand Master',
                description: 'Complete all other quests.',
                target: 5,
                current: 0,
                rewardXp: 500,
                isCompleted: false,
                objectives: [
                    "Cypress Scout",
                    "Bug Hunter",
                    "Console Cowboy",
                    "Polyglot Tester",
                    "Recruiter Protocol"
                ]
            },
        ],
        logs: [
            "Initializing TestSuite.ui v3.1.0...",
            "Loading profile data for Turan Aymis...",
            "7+ years QA experience detected.",
            "AI testing modules loaded: LLM-as-a-Judge ready.",
            "System ready. Type 'help' for commands.",
            "Hint: try 'run-tests', 'goto projects' — or press Ctrl+K."
        ]
    },
    tr: {
        translations: {
            role: '"Yazılım KG Mühendisi"',
            summary: "7+ yıllık deneyime sahip Software QA Engineer'ım. Bankacılık, e-ticaret ve mobil uygulama projelerinde manuel ve otomasyon testin her aşamasında çalıştım; güncel odağım AI'ı test süreçlerine entegre etmek. Çalıştığım şirkette test otomasyonunu başlatan kişiyim ve üretimdeki bir AI chatbot'u 400+ senaryoyla test eden LLM-as-a-Judge sistemini geliştirdim.",
            runTests: 'Testleri Çalıştır',
            viewSpecs: 'Özellikleri Gör',
            experience: 'DENEYİM',
            frameworks: 'ÇATILAR',
            methodology: 'METODOLOJİ',
            expLabel: '7+ Yıl',
            testingLabel: 'Web & Mobil Test',
            agileLabel: 'Agile / Scrum',
            aboutMe: 'Hakkımda',
            education: 'Eğitim & Sertifikalar',
            bachelor: "Elektronik Öğretmenliği Lisans Derecesi",
            bachelorDesc: 'Kocaeli Üniversitesi — 2016',
            cs50: 'CS50x: Bilgisayar Bilimlerine Giriş',
            cs50Desc: 'Harvard Üniversitesi (edX) — 2025',
            skillsTitle: 'Test Spesifikasyonları (Yetenekler)',
            suiteStability: 'Paket Kararlılığı',
            lastRun: 'Son Koşu: BAŞARILI',
            deploymentLog: 'dağıtım_geçmişi.log',
            viewProject: 'Proje Detaylarını Gör',
            hideDetails: 'Detayları Gizle',
            keyAccomplishments: 'Önemli Başarılar',
            impact: 'Etki:',
            contactReq: 'Yeni Bilet: İletişim İsteği',
            reporter: 'Bildiren (İsim)',
            email: 'İletişim E-postası',
            message: 'Açıklama (Mesaj)',
            submit: 'Bileti Gönder',
            sentSuccess: 'Mesaj başarıyla gönderildi!',
            navOverview: 'özet',
            navAbout: 'hakkımda',
            navSkills: 'yetenekler',
            navHistory: 'iş_geçmişi',
            navContact: 'iletişim',
            navProjects: 'projeler',
            projectsTitle: 'Öne Çıkan Projeler',
            featuredLabel: 'Öne Çıkan',
            viewCode: 'Kodu Gör',
            liveReport: 'Canlı Rapor',
            viewProjects: 'Projeleri Gör',
            projectsSeoTitle: 'Projeler | AI Destekli QA ve Test Otomasyonu',
            projectsSeoDesc: "Turan Aymis'in seçili projeleri: LLM-as-a-Judge AI chatbot test framework'ü, AI destekli Playwright QA framework'ü ve VentoRideSafety mobil uygulaması.",
            extDeps: 'Harici Bağımlılıklar',
            serverOnline: 'Sunucu: Çevrimiçi',
            termReady: 'Hazır',
            termHeader: 'Terminal — Yerel — zsh',
            termPlaceholder: "Komutlar için 'help' yazın...",
            termHelpIntro: 'Kullanılabilir komutlar:',
            termHelpRunTests: 'Otomasyon paketini çalıştır',
            termHelpGoto: 'Gezin (home, about, skills, exp, projects, contact)',
            termHelpWhoami: 'Profil bilgisi',
            termHelpClear: 'Terminali temizle',
            testLLMJudgeRun: 'LLM-as-a-Judge senaryo paketi çalıştırılıyor: 400+ soru-cevap...',
            testLLMJudgePass: 'Tüm chatbot yanıtları doğrulandı',
            cmdRunTestsDesc: "Suite'i çalıştır",
            cmdGotoDesc: 'Sayfaya git',
            cmdWhoamiDesc: 'Profil bilgisi',
            cmdHelpDesc: 'Komutları listele',
            hints: [
                "AI test projelerim için 'goto projects' yazın",
                "Arayüzde gizli bir bug var... bulabilir misiniz?",
                "Görevleri tamamlayıp XP kazanın",
                "Komut paleti için Ctrl+K"
            ],
            workspaceTitle: 'QA_CALISMA_ALANI',
            portfolioProject: 'PORTFOLYO_PROJESI',
            downloadCV: 'CV İndir',
            downloadResume: "CV'nin Tamamını İndir",
            reportIssue: 'Sorun Bildir',
            openCmdPalette: 'Komut paletini aç',
            cmdPalettePlaceholder: 'Komut yazın veya arayın...',
            cmdPaletteHelp: '↑↓ gezin · Enter seç · Esc kapat',
            level: 'Oyuncu Seviyesi',
            activeQuest: 'Aktif Görev',
            allComplete: 'Tüm görevler tamamlandı!',
            coverage: 'Kapsam',
            badges: 'Rozetler',
            sysCmds: 'Sistem Komutları',
            hintSys: 'İpucu Sistemi',
            achUnlocked: 'Başarım',
            levelUp: 'Seviye Atlandı',
            questComp: 'Tamamlandı',
            clickDismiss: 'Kapat',
            charSheet: 'KARAKTER_KARTI.md',
            stats: 'Nitelikler',
            lore: 'Karakter Hikayesi',
            inventory: 'Envanter',
            equipped: 'Kuşanıldı',
            attributes: {
                int: 'Zeka',
                wis: 'Bilgelik',
                cha: 'Karizma',
                dex: 'Çeviklik'
            },
            missionStart: 'BAŞLAT',
            missionBrief: 'GÖREV ÖZETİ',
            sysStatus: 'SİSTEM DURUMU',
            playerReady: 'OYUNCU HAZIR',
            currentObj: 'MEVCUT HEDEF',
            commsTitle: 'GÜVENLİ BAĞLANTI // İLETİM KONSOLU',
            signalStrength: 'SİNYAL GÜCÜ',
            encryption: 'ŞİFRELEME: AES-256 [AKTİF]',
            transmitting: 'VERİ İLETİLİYOR...',
            sourceId: 'KAYNAK_KİMLİĞİ (İSİM)',
            commFreq: 'İLETİŞİM_FREKANSI (E-POSTA)',
            dataPayload: 'VERİ_YÜKÜ (MESAJ)',
            initiateUpload: 'VERİ YÜKLEMESİNİ BAŞLAT'
        },
        experience: [
            {
                id: 'monster',
                role: 'Software QA Engineer',
                company: 'Monster Notebook',
                period: 'Eyl 2021 – Günümüz',
                location: 'İstanbul, Türkiye',
                description: [
                    "Monster Notebook'un e-ticaret platformunda (4 ülke sitesi ve iOS/Android uygulamaları) test süreçlerini yürütüyorum. Şirkette test otomasyonunu başlatan kişiyim.",
                    "Web sitelerinin ilk test otomasyonunu TestProject ile kurdum; Testinium altyapısına geçiş sonrasında tüm sitelerin otomasyon senaryolarını Java, Selenium ve Gauge ile kendim geliştirdim.",
                    "Kendi öğrendiğim Python ve Playwright ile şirketin AI chatbot agent'ının test otomasyonunu sıfırdan geliştirdim: JSON veri setinden 400+ soru-cevap, otomatik sorgulama, LLM-as-a-Judge değerlendirmesi ile gerekçeli pass/fail kararları, ekran görüntülü Allure raporlama, Excel çıktısı.",
                    "Kullanıcı hikayelerine dayalı test planları, test case'ler ve uçtan uca senaryolar hazırlıyorum.",
                    "Postman ile API testleri yürütüyorum.",
                    "Mobil uygulamaların fonksiyonel, regresyon ve E2E testlerini gerçek cihazlar ve BrowserStack üzerinde gerçekleştiriyorum.",
                    "Azure DevOps üzerinde hata takibi ve defect dokümantasyonu yapıyorum."
                ],
                techStack: ['Selenium', 'Appium', 'Java', 'Azure', 'Postman'],
                projects: [
                    {
                        title: "Test Otomasyon Mimarisi",
                        desc: "Çeşitli platformlar için web ve mobil test otomasyon sistemleri tasarladı ve uyguladı.",
                        impact: "Azure uzak deposu kullanılarak işbirliği kolaylaştırıldı.",
                        testStrategy: {
                            automationFramework: 'Selenium & Appium',
                            testScope: 'E2E + Regression',
                            testCoverage: 92
                        }
                    },
                    {
                        title: "Kritik Proje Testleri",
                        desc: "Kritik sürümler için Regresyon, Entegrasyon ve E2E testleri gerçekleştirdi.",
                        impact: "Kaliteyi sağlamak için yazılım hatalarına dair detaylı dokümantasyon hazırladı.",
                        testStrategy: {
                            automationFramework: 'Postman (API) / Manual',
                            testScope: 'API Integration',
                            testCoverage: 85
                        }
                    }
                ]
            },
            {
                id: 'dogus',
                role: 'QA Takım Lideri',
                company: 'Doğuş Teknoloji (via Quality Museum)',
                period: 'May 2021 – Eyl 2021',
                location: 'İstanbul, Türkiye',
                description: [
                    "Doğuş Grubu'nun Zubizu mobil uygulamasında (iOS/Android) 4 kişilik test ekibini QA Team Lead olarak yönettim.",
                    "Projenin master test planını oluşturdum ve test süreçlerini yapılandırdım.",
                    "Ekipçe kullanılan standart test case şablonunu hazırladım.",
                    "Azure DevOps üzerinde test senaryolarının ve görevlerin takibini kurdum.",
                    "Regresyon senaryolarının otomasyon ekibine devrini yönettim.",
                    "Ekip üyeleriyle birebir görüşmeler ve iş yükü planlaması yürüttüm."
                ],
                techStack: ['Mobile Testing', 'Azure', 'Test Management', 'Zubizu'],
                projects: [
                    {
                        title: "Zubizu KG Liderliği",
                        desc: "Test ekibini yönetti ve kapsamlı test stratejileri belirledi.",
                        impact: "Sorunsuz test süreçleri ve kaliteli teslimatlar sağladı.",
                        testStrategy: {
                            automationFramework: 'Azure DevOps',
                            testScope: 'Process Management',
                            testCoverage: 100
                        }
                    },
                    {
                        title: "Süreç Optimizasyonu",
                        desc: "Test senaryoları için yeniden kullanılabilir şablonlar oluşturdu ve test dokümantasyonunu inceledi.",
                        impact: "İşleme alınabilir test öğeleri ile backlog iyileştirmesini destekledi.",
                        testStrategy: {
                            automationFramework: 'Manual / Azure',
                            testScope: 'Documentation',
                            testCoverage: 88
                        }
                    }
                ]
            },
            {
                id: 'akbank',
                role: 'Software QA Engineer',
                company: 'Akbank via Netaş',
                period: 'Eyl 2018 – May 2021',
                location: 'İstanbul, Türkiye',
                description: [
                    "Akbank'ın mobil bankacılık projelerinde (Akbank Mobil ve Axess iOS/Android uygulamaları) QA Engineer olarak çalıştım.",
                    "Mobil uygulamaların UI ve E2E entegrasyon testlerini yürüttüm.",
                    "Analiz dokümanlarına dayalı test senaryoları yazdım ve TFS üzerinde yönettim.",
                    "SOAP UI ile web servis testleri gerçekleştirdim.",
                    "Regresyon testleri ve kullanıcı kabul testi (UAT) süreçlerine destek verdim.",
                    "Test verisi setlerini oluşturup yönettim; hata raporlama ve takip süreçlerini yürüttüm."
                ],
                techStack: ['Mobile Banking', 'TFS', 'SOAP UI', 'SQL'],
                projects: [
                    {
                        title: "Mobil Bankacılık Doğrulama",
                        desc: "Mobil uygulamalar için manuel ve regresyon testleri gerçekleştirdi ve veri setlerini korudu.",
                        impact: "Akbank mobil uygulamalarında işlevsellik ve kullanılabilirliği sürdürdü.",
                        testStrategy: {
                            automationFramework: 'UFT / Manual',
                            testScope: 'Functional / UAT',
                            testCoverage: 91
                        }
                    },
                    {
                        title: "Arka Uç Entegrasyonu",
                        desc: "Güçlü arka uç doğrulaması için SOAP UI kullanarak web servis testleri gerçekleştirdi.",
                        impact: "Analiz belgelerine dayalı test senaryolarını TFS'e entegre etti.",
                        testStrategy: {
                            automationFramework: 'SOAP UI',
                            testScope: 'Backend API',
                            testCoverage: 94
                        }
                    }
                ]
            }
        ],
        projects: [
            {
                id: 'llm-judge',
                name: 'LLM-as-a-Judge — AI Chatbot Test Framework',
                description: "Üretimdeki bir AI chatbot agent'ını test etmek için geliştirdiğim sistemin açık kaynak versiyonu. 400+ soru-cevap çiftini JSON veri setinden okuyup chatbot'a otomatik soran, yanıtları LLM-as-a-Judge yöntemiyle değerlendirip pass/fail kararını gerekçesiyle veren framework. Sağlayıcı-bağımsız yargıç katmanı (OpenAI/Gemini), ekran görüntülü Allure raporlama, Excel çıktısı.",
                tags: ['Playwright', 'Pytest', 'Python', 'OpenAI', 'Gemini', 'Allure'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/llm-judge-chatbot-testing' }
                ],
                featured: true
            },
            {
                id: 'playwright-framework',
                name: 'AI-Assisted Playwright QA Framework',
                description: "Playwright + TypeScript ile geliştirdiğim E2E test framework'ü: POM mimarisi, GitHub Actions CI ve her push'ta GitHub Pages'e otomatik yayımlanan canlı HTML test raporu.",
                tags: ['Playwright', 'TypeScript', 'GitHub Actions', 'POM', 'CI/CD'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/ai-assisted-playwright-qa-framework' },
                    { type: 'live', url: 'https://turanaymis.github.io/ai-assisted-playwright-qa-framework/' }
                ]
            },
            {
                id: 'ventoridesafety',
                name: 'VentoRideSafety',
                description: 'Motosikletçiler için hava durumu ve sürüş riski değerlendirmesi yapan mobil uygulama. React Native + Expo ile, AI destekli geliştirme araçlarıyla üretildi. App Store ve Google Play yayın sürecinde.',
                tags: ['React Native', 'Expo', 'Mobile', 'AI-Assisted Development'],
                links: [
                    { type: 'github', url: 'https://github.com/TuranAymis/VentoRideSafety' }
                ]
            }
        ],
        quests: [
            {
                id: 'q1',
                title: 'Cypress İzci',
                description: 'Portfolyoda 3 farklı sayfayı keşfet',
                target: 3,
                current: 0,
                rewardXp: 50,
                isCompleted: false
            },
            {
                id: 'q2',
                title: 'Böcek Avcısı',
                description: 'Gizli UI hatasını bul ve raporla.',
                target: 1,
                current: 0,
                rewardXp: 150,
                isCompleted: false
            },
            {
                id: 'q3',
                title: 'Konsol Kovboyu',
                description: 'Terminalde geçerli bir komut çalıştır.',
                target: 1,
                current: 0,
                rewardXp: 75,
                isCompleted: false
            },
            {
                id: 'q4',
                title: 'Çok Dilli Test Uzmanı',
                description: 'Dil seçiciyi en az bir kez değiştir.',
                target: 1,
                current: 0,
                rewardXp: 50,
                isCompleted: false
            },
            {
                id: 'q5',
                title: 'İşe Alım Protokolü',
                description: "'CV İndir' butonuna veya LinkedIn bağlantısına tıkla.",
                target: 1,
                current: 0,
                rewardXp: 100,
                isCompleted: false
            },
            {
                id: 'q6',
                title: 'Büyük Usta',
                description: 'Diğer tüm görevleri tamamla.',
                target: 5,
                current: 0,
                rewardXp: 500,
                isCompleted: false,
                objectives: [
                    "Cypress İzci",
                    "Böcek Avcısı",
                    "Konsol Kovboyu",
                    "Çok Dilli Test Uzmanı",
                    "İşe Alım Protokolü"
                ]
            },
        ],
        logs: [
            "TestSuite.ui v3.1.0 başlatılıyor...",
            "Turan Aymis profil verisi yükleniyor...",
            "7+ yıl QA deneyimi algılandı.",
            "AI test modülleri yüklendi: LLM-as-a-Judge hazır.",
            "Sistem hazır. Komutlar için 'help' yazın.",
            "İpucu: 'run-tests', 'goto projects' deneyin — veya Ctrl+K'ya basın."
        ]
    }
    // Spanish, Chinese, Hindi, Arabic use English fallback via constants.tsx
};
