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
            summary: 'Proactive and detail-oriented Software QA Engineer with 6+ years of experience in manual and automated testing across web and mobile applications.',
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
                    'Contributed to e-commerce projects focusing on UI, E2E integration, and API testing.',
                    'Designed and implemented automation frameworks using Selenium and Appium (Testinium, Browserstack, Java).',
                    'Created and executed comprehensive Test Plans, Test Cases, and End-to-End Scenarios based on user stories.',
                    'Conducted manual API testing using Postman and utilized Azure as a remote repository.',
                    'Actively participated in Agile ceremonies: sprint planning, daily scrums, grooming, and retrospectives.'
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
                role: 'Software QA Engineer (Team Lead)',
                company: 'Doğuş Technology',
                period: 'May 2021 – Sep 2021',
                location: 'Istanbul, Turkey',
                description: [
                    'Led QA efforts for the "Zubizu" mobile application as QA Team Lead.',
                    'Managed the test team, established strategies, and supervised resolved bugs.',
                    'Developed a comprehensive Master Plan for testing processes and created reusable test case templates.',
                    'Monitored task connections and scenario updates using Azure tools.',
                    'Ensured regression scenarios were automated by the automation team.'
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
                    'Specialized in mobile banking projects, performing UI and E2E integration tests.',
                    'Executed front-end functionality tests of the mobile banking app.',
                    'Tracked and reported bugs using TFS for efficient issue resolution.',
                    'Conducted User Acceptance Tests (UAT) and prepared actionable feedback.',
                    'Conducted web service testing using SOAP UI for robust backend validation.'
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
            { id: 'q1', title: 'System Initialization', description: 'Run Test Suite to verify system integrity.', target: 1, current: 0, rewardXp: 300, isCompleted: false },
            { id: 'q2', title: 'Bug Hunter', description: 'Find and squash 3 hidden bugs in the UI.', target: 3, current: 0, rewardXp: 500, isCompleted: false },
            { id: 'q3', title: 'Full Coverage', description: 'Navigate to all 5 sections of the portfolio.', target: 5, current: 0, rewardXp: 800, isCompleted: false },
            { id: 'q4', title: 'Grand Master', description: 'Unlock all achievements.', target: 5, current: 0, rewardXp: 1000, isCompleted: false },
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
            summary: 'Web ve mobil uygulamalarda manuel ve otomasyon testlerinde 6+ yıl deneyime sahip, proaktif ve detay odaklı Yazılım Kalite Güvence Mühendisi.',
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
                    'UI, E2E entegrasyon ve API testlerine odaklanan e-ticaret projelerine katkıda bulundu.',
                    'Selenium ve Appium (Testinium, Browserstack, Java) kullanarak otomasyon çerçeveleri tasarladı ve uyguladı.',
                    'Kullanıcı hikayelerine dayalı kapsamlı Test Planları, Test Senaryoları ve Uçtan Uca Senaryolar oluşturdu ve yürüttü.',
                    'Postman kullanarak manuel API testleri gerçekleştirdi ve işbirliği için Azure kullandı.',
                    'Sprint planlama, günlük scrumlar ve retrospektifler dahil olmak üzere Agile seremonilerine aktif olarak katıldı.'
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
                role: 'Software QA Engineer (Takım Lideri)',
                company: 'Doğuş Technology',
                period: 'May 2021 – Eyl 2021',
                location: 'İstanbul, Türkiye',
                description: [
                    '"Zubizu" mobil uygulaması için QA Takım Lideri olarak QA çalışmalarına liderlik etti.',
                    'Test ekibini yönetti, stratejiler belirledi ve çözülen hataları denetledi.',
                    'Test süreçleri için kapsamlı bir Ana Plan geliştirdi ve yeniden kullanılabilir test senaryosu şablonları oluşturdu.',
                    'Azure araçlarını kullanarak görev bağlantılarını ve senaryo güncellemelerini izledi.',
                    'Regresyon senaryolarının otomasyon ekibi tarafından otomatikleştirilmesini sağladı.'
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
                    'Mobil bankacılık projelerinde uzmanlaştı, UI ve E2E entegrasyon testleri gerçekleştirdi.',
                    'Mobil bankacılık uygulamasının ön uç işlevsellik testlerini yürüttü.',
                    'Verimli sorun çözümü için TFS kullanarak hataları takip etti ve raporladı.',
                    'Kullanıcı Kabul Testleri (UAT) gerçekleştirdi ve işleme alınabilir geri bildirimler hazırladı.',
                    'Güçlü arka uç doğrulaması için SOAP UI kullanarak web servis testleri gerçekleştirdi.'
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
            { id: 'q1', title: 'Sistem Başlatma', description: 'Sistem bütünlüğünü doğrulamak için Test Paketini Çalıştır.', target: 1, current: 0, rewardXp: 300, isCompleted: false },
            { id: 'q2', title: 'Böcek Avcısı', description: 'Arayüzde gizlenmiş 3 hatayı bul ve ez.', target: 3, current: 0, rewardXp: 500, isCompleted: false },
            { id: 'q3', title: 'Tam Kapsama', description: 'Portföyün 5 bölümünün hepsine git.', target: 5, current: 0, rewardXp: 800, isCompleted: false },
            { id: 'q4', title: 'Büyük Usta', description: 'Tüm başarımların kilidini aç.', target: 5, current: 0, rewardXp: 1000, isCompleted: false },
        ],
        logs: [
            "TestSuite.ui v3.0.1 Başlatılıyor...",
            "Turan Aymis için profil verileri yükleniyor...",
            "Azure/TFS Depoları ile senkronize ediliyor... [MOCKED]",
            "Otomasyon yeterliliği kalibre ediliyor...",
            "Sistem hazır. Kullanıcı girişi bekleniyor."
        ]
    }
    // Other languages omitted for brevity but would follow same structure
};
