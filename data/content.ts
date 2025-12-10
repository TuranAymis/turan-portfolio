import { Skill, ExperienceItem, TranslationDictionary, Quest } from '../types';

export const SKILLS: Skill[] = [
    // Automation
    { id: 'selenium', name: 'Selenium', level: 95, category: 'automation', icon: 'Bot', isMastered: true },
    { id: 'appium', name: 'Appium', level: 90, category: 'automation', icon: 'Smartphone', isMastered: true },
    { id: 'testinium', name: 'Testinium', level: 85, category: 'automation', icon: 'TestTube', isMastered: false },
    { id: 'browserstack', name: 'Browserstack', level: 85, category: 'automation', icon: 'Globe', isMastered: false },

    // Languages & Frameworks
    { id: 'java', name: 'Java', level: 90, category: 'languages', icon: 'Coffee', isMastered: true },
    { id: 'python', name: 'Python', level: 80, category: 'languages', icon: 'FileCode', isMastered: false },
    { id: 'cucumber', name: 'Cucumber', level: 85, category: 'languages', icon: 'Sprout', isMastered: false },
    { id: 'gauge', name: 'Gauge', level: 75, category: 'languages', icon: 'Gauge', isMastered: false },

    // API
    { id: 'postman', name: 'Postman', level: 95, category: 'api', icon: 'Send', isMastered: true },
    { id: 'soapui', name: 'SOAP UI', level: 80, category: 'api', icon: 'FileJson', isMastered: false },
    { id: 'swagger', name: 'Swagger', level: 85, category: 'api', icon: 'BookOpen', isMastered: false },

    // CI/CD & Management
    { id: 'azure', name: 'Azure', level: 85, category: 'devops', icon: 'Cloud', isMastered: false },
    { id: 'jira', name: 'Jira', level: 95, category: 'tracking', icon: 'Trello', isMastered: true },
    { id: 'tfs', name: 'TFS', level: 85, category: 'tracking', icon: 'GitMerge', isMastered: false },
    { id: 'sql', name: 'SQL', level: 80, category: 'languages', icon: 'Database', isMastered: false },
];

interface ContentData {
    translations: TranslationDictionary;
    experience: ExperienceItem[];
    quests: Quest[];
    logs: string[];
}

export const CONTENT: Record<string, ContentData> = {
    en: {
        translations: {
            role: '"Software QA Engineer"',
            summary: 'Proactive and detail-oriented Software QA Engineer with 6+ years of experience in manual and automated testing across web and mobile applications. Skilled in Selenium, Appium, and API testing.',
            runTests: 'Run Test Suite',
            viewSpecs: 'View Specs',
            experience: 'EXPERIENCE',
            frameworks: 'FRAMEWORKS',
            methodology: 'METHODOLOGY',
            expLabel: '6+ Years',
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
            extDeps: 'External Dependencies',
            serverOnline: 'Server: Online',
            termReady: 'Ready',
            termHeader: 'Terminal — Local — zsh',
            termPlaceholder: "Type 'help' for commands...",
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
                    'Focusing on UI, E2E integration, and API testing for e-commerce projects.',
                    'Designing automation frameworks using Selenium and Appium (Testinium, Browserstack, Java).'
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
                    'Led QA efforts for the Zubizu mobile app.',
                    'Managed the test team, established strategies, and developed a comprehensive Master Plan.'
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
                    'Performed UI and E2E integration tests for mobile banking apps.',
                    'Tracked bugs using TFS and conducted User Acceptance Tests (UAT).'
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
        quests: [
            {
                id: 'q1',
                title: 'Cypress Scout',
                description: 'Visit Home, About, and Skills pages.',
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
            "Initializing TestSuite.ui v3.0.1...",
            "Loading profile data for Turan Aymis...",
            "Syncing with Azure/TFS Repositories... [MOCKED]",
            "Calibrating automation proficiency...",
            "System ready. Awaiting user input."
        ]
    },
    tr: {
        translations: {
            role: '"Yazılım KG Mühendisi"',
            summary: 'Web ve mobil uygulamalarda manuel ve otomasyon testleri konusunda uzman, 6 yılı aşkın deneyime sahip Yazılım Test Mühendisi. Selenium, Appium ve API test araçlarında deneyimli.',
            runTests: 'Testleri Çalıştır',
            viewSpecs: 'Özellikleri Gör',
            experience: 'DENEYİM',
            frameworks: 'ÇATILAR',
            methodology: 'METODOLOJİ',
            expLabel: '6+ Yıl',
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
            extDeps: 'Harici Bağımlılıklar',
            serverOnline: 'Sunucu: Çevrimiçi',
            termReady: 'Hazır',
            termHeader: 'Terminal — Yerel — zsh',
            termPlaceholder: "Komutlar için 'help' yazın...",
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
                    'E-ticaret projelerinde UI, Uçtan Uca (E2E) entegrasyon ve API testlerinde görev aldım.',
                    'Selenium ve Appium kullanarak otomasyon frameworkleri tasarladım.'
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
                    'Zubizu mobil uygulama projesinde QA Takım Lideri olarak görev aldım.',
                    'Test ekibini yönettim ve test stratejilerini belirledim.'
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
                    'Mobil bankacılık uygulamalarının ön yüz (UI) ve fonksiyonel testlerini gerçekleştirdim.',
                    'TFS kullanarak hata takibi yaptım ve UAT süreçlerini yürüttüm.'
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
        quests: [
            {
                id: 'q1',
                title: 'Cypress İzci',
                description: 'Ana Sayfa, Hakkımda ve Yetenekler sayfalarını ziyaret et.',
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
            "TestSuite.ui v3.0.1 Başlatılıyor...",
            "Turan Aymis için profil verileri yükleniyor...",
            "Azure/TFS Depoları ile senkronize ediliyor... [MOCKED]",
            "Otomasyon yeterliliği kalibre ediliyor...",
            "Sistem hazır. Kullanıcı girişi bekleniyor."
        ]
    }
    // Spanish, Chinese, Hindi, Arabic use English fallback via constants.tsx
};
