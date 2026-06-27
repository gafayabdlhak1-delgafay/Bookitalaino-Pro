/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "./translations";

// Map of Arabic phrases to English, French, and Spanish
export const ARABIC_TRANSLATION_MAP: Record<string, Record<Exclude<LanguageCode, "ar">, string>> = {
  "الأساسيات والترحيب والتعارف": {
    en: "Basics, Greetings & Introduction",
    fr: "Bases, Salutations & Présentation",
    es: "Básicos, Saludos y Presentación"
  },
  "تعلم التحيات والوداع وكيفية تقديم نفسك باللغة الإيطالية مع النطق التفاعلي.": {
    en: "Learn greetings, farewells and how to introduce yourself in Italian with interactive pronunciation.",
    fr: "Apprenez les salutations, les adieux et comment vous présenter en italien avec une prononciation interactive.",
    es: "Aprende saludos, despedidas y cómo presentarte en italiano con pronunciación interactiva."
  },
  "القواعد والضمائر الأساسية": {
    en: "Grammar & Basic Pronouns",
    fr: "Grammaire & Pronoms de Base",
    es: "Gramática y Pronombres Básicos"
  },
  "فهم أساسيات القواعد الإيطالية، الضمائر الشخصية وأهم الأفعال (Essere & Avere).": {
    en: "Understand the basics of Italian grammar, personal pronouns and the main verbs (Essere & Avere).",
    fr: "Comprendre les bases de la grammaire italienne, les pronoms personnels et les verbes principaux (Essere & Avere).",
    es: "Comprende los conceptos básicos de la gramática italiana, los pronombres personales y los verbos principales (Essere & Avere)."
  },
  "المحادثات والمواقف اليومية": {
    en: "Conversations & Daily Situations",
    fr: "Conversations & Situations Quotidiennes",
    es: "Conversaciones y Situaciones Cotidianas"
  },
  "كيف تطلب قهوة في المقهى الإيطالي أو تسأل عن الاتجاهات بشكل مبسط.": {
    en: "How to order a coffee in an Italian café or ask for directions in a simple way.",
    fr: "Comment commander un café dans un café italien ou demander des directions de manière simple.",
    es: "Cómo pedir un café en una cafetería italiana o preguntar por direcciones de forma sencilla."
  },
  "الترحيب والتعارف الأساسي": {
    en: "Basic Greetings & Introductions",
    fr: "Salutations de base & Présentations",
    es: "Saludos básicos y Presentaciones"
  },
  "مرحباً بك في درسك الأول! 🇮🇹": {
    en: "Welcome to your first lesson! 🇮🇹",
    fr: "Bienvenue dans votre première leçon ! 🇮🇹",
    es: "¡Bienvenido a tu primera lección! 🇮🇹"
  },
  "انقر على أي عبارة باللغة الإيطالية لسماع نطقها الصحيح بصوت بشري تفاعلي.": {
    en: "Click on any Italian phrase to hear its correct pronunciation with interactive human voice.",
    fr: "Cliquez sur n'importe quelle phrase italienne pour entendre sa prononciation correcte.",
    es: "Haz clic en cualquier frase italiana para escuchar su pronunciación correcta."
  },
  "1. تحيات الصباح والمساء (I Saluti)": {
    en: "1. Morning and Evening Greetings (I Saluti)",
    fr: "1. Salutations du matin et du soir (I Saluti)",
    es: "1. Saludos de la mañana y de la tarde (I Saluti)"
  },
  "مرحباً / وداعاً": {
    en: "Hello / Goodbye",
    fr: "Bonjour / Au revoir",
    es: "Hola / Adiós"
  },
  "صباح الخير / يوم سعيد": {
    en: "Good morning / Good day",
    fr: "Bonjour / Bonne journée",
    es: "Buenos días / Buen día"
  },
  "مساء الخير": {
    en: "Good evening",
    fr: "Bonsoir",
    es: "Buenas tardes"
  },
  "إلى اللقاء": {
    en: "Goodbye",
    fr: "Au revoir",
    es: "Adiós"
  },
  "2. التعارف والسؤال عن الحال": {
    en: "2. Introductions & Asking How Someone Is",
    fr: "2. Présentation & Demande de nouvelles",
    es: "2. Presentación y Preguntar cómo está"
  },
  "سؤال": {
    en: "Question",
    fr: "Question",
    es: "Pregunta"
  },
  "جواب": {
    en: "Answer",
    fr: "Réponse",
    es: "Respuesta"
  },
  "عبارة": {
    en: "Phrase",
    fr: "Phrase",
    es: "Frase"
  },
  "ما اسمك؟": {
    en: "What is your name?",
    fr: "Comment t'appelles-tu ?",
    es: "¿Cómo te llamas?"
  },
  "اسمي عمر. وأنت؟": {
    en: "My name is Omar. And you?",
    fr: "Je m'appelle Omar. Et toi ?",
    es: "Me llamo Omar. ¿Y tú?"
  },
  "تشرفت بلقائك!": {
    en: "Nice to meet you!",
    fr: "Enchanté de vous rencontrer !",
    es: "¡Mucho gusto!"
  },
  "اختبر معلوماتك السريعة:": {
    en: "Quick Quiz:",
    fr: "Quiz rapide :",
    es: "Cuestionario rápido:"
  },
  "ما هي العبارة الإيطالية التي تعني \"صباح الخير\"؟": {
    en: "What is the Italian phrase for 'Good morning'?",
    fr: "Quelle est la phrase italienne pour 'Bonjour' ?",
    es: "¿Cuál es la frase en italiano para 'Buenos días'?"
  },
  "خطأ! Arrivederci تعني إلى اللقاء.": {
    en: "Wrong! Arrivederci means Goodbye.",
    fr: "Faux ! Arrivederci signifie Au revoir.",
    es: "¡Incorrecto! Arrivederci significa Adiós."
  },
  "أحسنت! Buongiorno هي صباح الخير!": {
    en: "Well done! Buongiorno is Good morning!",
    fr: "Bravo ! Buongiorno signifie Bonjour !",
    es: "¡Excelente! ¡Buongiorno es Buenos días!"
  },
  "خطأ! Buonasera تعني مساء الخير.": {
    en: "Wrong! Buonasera means Good evening.",
    fr: "Faux ! Buonasera signifie Bonsoir.",
    es: "¡Incorrecto! Buonasera significa Buenas tardes."
  },
  "انتقل لدرس الضمائر الشخصية": {
    en: "Go to Personal Pronouns lesson",
    fr: "Aller à la leçon sur les pronoms",
    es: "Ir a la lección de pronombres"
  },
  "الضمائر الشخصية والأعداد": {
    en: "Personal Pronouns & Numbers",
    fr: "Pronoms personnels & Chiffres",
    es: "Pronombres personales y Números"
  },
  "الضمائر الشخصية (I Pronomi Personali) 🇮🇹": {
    en: "Personal Pronouns (I Pronomi Personali) 🇮🇹",
    fr: "Pronoms personnels (I Pronomi Personali) 🇮🇹",
    es: "Pronombres personales (I Pronomi Personali) 🇮🇹"
  },
  "الضمائر هي أساس تكوين أي جملة. انقر على الضمير لتسمع نطق الإيطالية الفصيح.": {
    en: "Pronouns are the foundation of any sentence. Click any pronoun to hear its clear Italian pronunciation.",
    fr: "Les pronoms sont la base de toute phrase. Cliquez sur le pronom pour entendre sa prononciation italienne.",
    es: "Los pronombres son la base de cualquier oración. Haz clic en el pronombre para escuchar su pronunciación."
  },
  "الضمير بالإيطالية": {
    en: "Pronoun in Italian",
    fr: "Pronom en italien",
    es: "Pronombre en italiano"
  },
  "المعنى بالعربية": {
    en: "Meaning",
    fr: "Signification",
    es: "Significado"
  },
  "أنا": {
    en: "I",
    fr: "Je",
    es: "Yo"
  },
  "أنتَ / أنتِ": {
    en: "You",
    fr: "Tu / Toi",
    es: "Tú"
  },
  "هو": {
    en: "He",
    fr: "Il",
    es: "Él"
  },
  "هي / صيغة الاحترام (حضرتك)": {
    en: "She / Formal You (Usted/Vous)",
    fr: "Elle / Vous (Formel)",
    es: "Ella / Usted (Formato formal)"
  },
  "نحن": {
    en: "We",
    fr: "Nous",
    es: "Nosotros"
  },
  "أنتم / أنتنّ": {
    en: "You (plural)",
    fr: "Vous (pluriel)",
    es: "Vosotros / Ustedes"
  },
  "هم / هنّ": {
    en: "They",
    fr: "Ils / Elles",
    es: "Ellos / Ellas"
  },
  "الأرقام الأساسية من 1 إلى 5 (I Numeri)": {
    en: "Basic Numbers from 1 to 5 (I Numeri)",
    fr: "Nombres cardinaux de 1 à 5 (I Numeri)",
    es: "Números básicos del 1 al 5 (I Numeri)"
  },
  "واحد": {
    en: "One",
    fr: "Un",
    es: "Uno"
  },
  "اثنان": {
    en: "Two",
    fr: "Deux",
    es: "Dos"
  },
  "ثلاثة": {
    en: "Three",
    fr: "Trois",
    es: "Tres"
  },
  "أربعة": {
    en: "Four",
    fr: "Quatre",
    es: "Cuatro"
  },
  "خمسة": {
    en: "Five",
    fr: "Cinq",
    es: "Cinco"
  },
  "→ السابق": {
    en: "→ Previous",
    fr: "→ Précédent",
    es: "→ Anterior"
  },
  "درس فعل الكينونة التالي ←": {
    en: "Next: Verb To Be Lesson ←",
    fr: "Suivant : Leçon Verbe Être ←",
    es: "Siguiente: Lección Verbo Ser ←"
  },
  "فعل الكينونة (Verbo Essere)": {
    en: "The Verb To Be (Verbo Essere)",
    fr: "Le verbe être (Verbo Essere)",
    es: "El verbo Ser/Estar (Verbo Essere)"
  },
  "فعل الكينونة: Essere (To be) 🇮🇹": {
    en: "The Verb To Be: Essere 🇮🇹",
    fr: "Le verbe Être : Essere 🇮🇹",
    es: "El Verbo Ser/Estar: Essere 🇮🇹"
  },
  "يعتبر من أهم الأفعال في اللغة الإيطالية ويستخدم لتعريف الهوية، الجنسية، الحالة، والموقع.": {
    en: "It is one of the most important verbs in Italian, used for identity, nationality, status, and location.",
    fr: "C'est l'un des verbes les plus importants en italien, utilisé pour l'identité, la nationalité, l'état et la situation.",
    es: "Es uno de los verbos más importantes en italiano, utilizado para la identidad, nacionalidad, estado y ubicación."
  },
  "تصريف الفعل مع الضمائر (Coniugazione)": {
    en: "Verb Conjugation (Coniugazione)",
    fr: "Conjugaison du verbe (Coniugazione)",
    es: "Conjugación del verbo (Coniugazione)"
  },
  "أنا أكون (إيطالي)": {
    en: "I am (Italian)",
    fr: "Je suis (italien)",
    es: "Yo soy (italiano)"
  },
  "أنت تكون (سعيد)": {
    en: "You are (happy)",
    fr: "Tu es (heureux)",
    es: "Tú eres (feliz)"
  },
  "هو يكون (تعبان)": {
    en: "He is (tired)",
    fr: "Il est (fatigué)",
    es: "Él está (cansado)"
  },
  "نحن نكون (جاهزون)": {
    en: "We are (ready)",
    fr: "Nous sommes (prêts)",
    es: "Nosotros estamos (listos)"
  },
  "✏️ تمرين تفاعلي سريع:": {
    en: "✏️ Quick Interactive Practice:",
    fr: "✏️ Exercice interactif rapide :",
    es: "✏️ Práctica interactiva rápida:"
  },
  "اختر التصريف الصحيح: ": {
    en: "Choose the correct conjugation: ",
    fr: "Choisissez la bonne conjugaison : ",
    es: "Elige la conjugación correcta: "
  },
  "(نحن نكون طلاب)": {
    en: "(We are students)",
    fr: "(Nous sommes étudiants)",
    es: "(Nosotros somos estudiantes)"
  },
  "خطأ! 'sei' تستخدم مع الضمير Tu (أنت).": {
    en: "Wrong! 'sei' is used with Tu (you).",
    fr: "Faux ! 'sei' s'utilise avec Tu (toi).",
    es: "¡Incorrecto! 'sei' se usa con Tu (tú)."
  },
  "صحيح جداً! 'Noi siamo' هي الإجابة الصحيحة.": {
    en: "Absolutely correct! 'Noi siamo' is the correct answer.",
    fr: "Tout à fait exact ! 'Noi siamo' est la bonne réponse.",
    es: "¡Absolutamente correcto! 'Noi siamo' es la respuesta correcta."
  },
  "خطأ! 'sono' تستخدم مع Io أو Loro.": {
    en: "Wrong! 'sono' is used with Io or Loro.",
    fr: "Faux ! 'sono' s'utilise avec Io ou Loro.",
    es: "¡Incorrecto! 'sono' se usa con Io o Loro."
  },
  "→ درس الضمائر السابق": {
    en: "→ Previous Pronouns Lesson",
    fr: "→ Leçon précédente sur les pronoms",
    es: "→ Lección anterior de pronombres"
  },
  "درس فعل الملكية التالي ←": {
    en: "Next: Verb To Have ←",
    fr: "Suivant : Verbe Avoir ←",
    es: "Siguiente: Verbo Tener ←"
  },
  "فعل الملكية (Verbo Avere)": {
    en: "The Verb To Have (Verbo Avere)",
    fr: "Le verbe avoir (Verbo Avere)",
    es: "El verbo Tener (Verbo Avere)"
  },
  "فعل الملكية: Avere (To have) 🇮🇹": {
    en: "The Verb To Have: Avere 🇮🇹",
    fr: "Le verbe Avoir : Avere 🇮🇹",
    es: "El Verbo Tener: Avere 🇮🇹"
  },
  "يستخدم للتعبير عن امتلاك الأشياء، وكذلك للتعبير عن الإحساس (الجوع، العطش، البرد، السن).": {
    en: "Used to express possession, as well as sensations (hunger, thirst, cold, age).",
    fr: "Utilisé pour exprimer la possession, ainsi que les sensations (faim, soif, froid, âge).",
    es: "Se utiliza para expresar la posesión, así como sensaciones (hambre, sed, frío, edad)."
  },
  "أنا أملك سيارة (حرف H صامت دائماً في الإيطالية، ينطق: إيو أُو)": {
    en: "I have a car (H is always silent in Italian, pronounced: io o)",
    fr: "J'ai une voiture (H est toujours muet en italien, prononcé : io o)",
    es: "Yo tengo un coche (la H siempre es muda en italiano, se pronuncia: io o)"
  },
  "أنت جائع (حرفياً: تملك جوعاً، ينطق: تو آي)": {
    en: "You are hungry (literally: you have hunger, pronounced: tu ai)",
    fr: "Tu as faim (littéralement : tu as de la faim, prononcé : tu ai)",
    es: "Tú tienes hambre (literalmente: tienes hambre, se pronuncia: tu ai)"
  },
  "هو يشعر بالحرارة (حرفياً: يملك حرّاً، ينطق: لوي آ)": {
    en: "He feels hot (literally: he has heat, pronounced: lui a)",
    fr: "Il a chaud (littéralement : il a chaud, prononcé : lui a)",
    es: "Él tiene calor (literalmente: tiene calor, se pronuncia: lui a)"
  },
  "نحن نملك الوقت (ينطق: نوي أبيامو)": {
    en: "We have time (pronounced: noi abbiamo)",
    fr: "Nous avons le temps (prononcé : noi abbiamo)",
    es: "Nosotros tenemos tiempo (se pronuncia: nosotros tenemos)"
  },
  "ملاحظة ذهبية 💡": {
    en: "Golden Note 💡",
    fr: "Note d'or 💡",
    es: "Nota de oro 💡"
  },
  "في اللغة الإيطالية، الحرف ": {
    en: "In the Italian language, the letter ",
    fr: "En italien, la lettre ",
    es: "En el idioma italiano, la letra "
  },
  " في بداية الكلمات يكون **صامتاً تماماً** ولا يُلفظ. لذلك كلمة ": {
    en: " at the beginning of words is **completely silent** and not pronounced. Therefore, the word ",
    fr: " au début des mots est **totalement muette**. Ainsi, le mot ",
    es: " al principio de las palabras es **completamente muda**. Por lo tanto, la palabra "
  },
  " تلفظ \"أو\"، وكلمة ": {
    en: " is pronounced 'o', and the word ",
    fr: " se prononce 'o', et le mot ",
    es: " se pronuncia 'o', y la palabra "
  },
  " تلفظ \"آي\".": {
    en: " is pronounced 'ai'.",
    fr: " se prononce 'ai'.",
    es: " se pronuncia 'ai'."
  },
  "→ فعل الكينونة السابق": {
    en: "→ Previous: Verb To Be",
    fr: "→ Précédent : Verbe Être",
    es: "→ Anterior: Verbo Ser"
  },
  "محادثة في المقهى التالية ←": {
    en: "Next: Café Conversation ←",
    fr: "Suivant : Conversation au Café ←",
    es: "Siguiente: Conversación en Café ←"
  },
  "محادثة في المقهى (Al Caffè)": {
    en: "At the Café (Al Caffè)",
    fr: "Au Café (Al Caffè)",
    es: "En el Café (Al Caffè)"
  },
  "محادثة واقعية في المقهى الإيطالي ☕🇮🇹": {
    en: "Realistic conversation in an Italian café ☕🇮🇹",
    fr: "Conversation réaliste dans un café italien ☕🇮🇹",
    es: "Conversación realista en un café italiano ☕🇮🇹"
  },
  "اضغط على أي جملة لتستمع إلى نطق الحوار الحقيقي بصوت إيطالي طبيعي.": {
    en: "Click any sentence to listen to the real dialogue spoken in natural Italian.",
    fr: "Cliquez sur n'importe quelle phrase pour écouter le vrai dialogue avec une voix italienne naturelle.",
    es: "Haz clic en cualquier frase para escuchar el diálogo real con una voz italiana natural."
  },
  "الندل (Cameriere):": {
    en: "Waiter (Cameriere):",
    fr: "Serveur (Cameriere) :",
    es: "Camarero (Cameriere):"
  },
  "صباح الخير! ماذا تفضل؟": {
    en: "Good morning! What would you like?",
    fr: "Bonjour ! Que désirez-vous ?",
    es: "¡Buenos días! ¿Qué desea?"
  },
  "الزبون (Omar):": {
    en: "Customer (Omar):",
    fr: "Client (Omar) :",
    es: "Cliente (Omar):"
  },
  "قهوة إسبريسو وكرواسون (كورنيتو)، لو سمحت.": {
    en: "An espresso coffee and a croissant (cornetto), please.",
    fr: "Un café expresso et un croissant (cornetto), s'il vous plaît.",
    es: "Un café espresso y un croissant (cornetto), por favor."
  },
  "بالتأكيد. أي شيء آخر؟": {
    en: "Certainly. Anything else?",
    fr: "Certainement. Autre chose ?",
    es: "Ciertamente. ¿Algo más?"
  },
  "لا، شكراً لك. كم الحساب؟": {
    en: "No, thank you. How much is it?",
    fr: "Non, merci. Combien ça fait ?",
    es: "No, gracias. ¿Cuánto es?"
  },
  "الحساب ثلاثة يورو وخمسين سنتاً.": {
    en: "It is three euros and fifty cents.",
    fr: "Ça fait trois euros et cinquante centimes.",
    es: "Son tres euros con cincuenta céntimos."
  },
  "المفردات الرئيسية في الدرس:": {
    en: "Key Vocabulary in the Lesson:",
    fr: "Vocabulaire clé de la leçon :",
    es: "Vocabulario clave de la lección:"
  },
  "قهوة": {
    en: "Coffee",
    fr: "Café",
    es: "Café"
  },
  "كرواسون": {
    en: "Croissant",
    fr: "Croissant",
    es: "Croissant"
  },
  "من فضلك": {
    en: "Please",
    fr: "S'il vous plaît",
    es: "Por favor"
  },
  "شكراً": {
    en: "Thank you",
    fr: "Merci",
    es: "Gracias"
  },
  "→ فعل الملكية السابق": {
    en: "→ Previous: Verb To Have",
    fr: "→ Précédent : Verbe Avoir",
    es: "→ Anterior: Verbo Tener"
  },
  "درس الاتجاهات التالي ←": {
    en: "Next: Directions Lesson ←",
    fr: "Suivant : Leçon de Directions ←",
    es: "Siguiente: Lección de Direcciones ←"
  },
  "السؤال عن الاتجاهات (Chiedere Indicazioni)": {
    en: "Asking for Directions (Chiedere Indicazioni)",
    fr: "Demander son chemin (Chiedere Indicazioni)",
    es: "Preguntar por Direcciones (Chiedere Indicazioni)"
  },
  "السؤال عن الاتجاهات والأماكن 🗺️🇮🇹": {
    en: "Asking for Directions and Places 🗺️🇮🇹",
    fr: "Demander des directions et des lieux 🗺️🇮🇹",
    es: "Preguntar por direcciones y lugares 🗺️🇮🇹"
  },
  "تعبيرات هامة جداً لأي مسافر يريد التنقل في إيطاليا.": {
    en: "Very important expressions for any traveler wanting to navigate Italy.",
    fr: "Expressions très importantes pour tout voyageur voulant naviguer en Italie.",
    es: "Expresiones muy importantes para cualquier viajero que quiera navegar por Italia."
  },
  "أين يقع الكولوسيوم؟": {
    en: "Where is the Colosseum?",
    fr: "Où est le Colisée ?",
    es: "¿Dónde está el Coliseo?"
  },
  "أين تقع محطة القطار؟": {
    en: "Where is the train station?",
    fr: "Où est la gare ferroviaire ?",
    es: "¿Dónde está la estación de tren?"
  },
  "لو سمحت، هل يوجد مطعم هنا بالقرب؟": {
    en: "Excuse me, is there a restaurant nearby?",
    fr: "S'il vous plaît, y a-t-il un restaurant à proximité ?",
    es: "Disculpe, ¿hay un restaurante aquí cerca?"
  },
  "كلمات الاتجاهات الأساسية:": {
    en: "Basic direction words:",
    fr: "Mots de direction de base :",
    es: "Palabras de dirección básicas:"
  },
  "على اليمين": {
    en: "On the right",
    fr: "À droite",
    es: "A la derecha"
  },
  "على اليسار": {
    en: "On the left",
    fr: "À gauche",
    es: "A la izquierda"
  },
  "مباشرة إلى الأمام": {
    en: "Straight ahead",
    fr: "Tout droit",
    es: "Todo recto"
  },
  "🎉": {
    en: "🎉",
    fr: "🎉",
    es: "🎉"
  },
  "لقد أكملت جميع الدروس الافتراضية!": {
    en: "You have completed all default lessons!",
    fr: "Vous avez terminé toutes les leçons par défaut !",
    es: "¡Has completado todas las lecciones predeterminadas!"
  },
  "بصفتك مديراً للكتاب، يمكنك النقر على أيقونة الملف الشخصي بالأعلى وإدخال كلمة المرور (admin) لفتح لوحة التحكم وإضافة فصول وصفحات مخصصة جديدة مذهلة!": {
    en: "As an administrator, you can click on the profile icon above and enter the password (admin) to open the control panel and add amazing new custom chapters and pages!",
    fr: "En tant qu'administrateur, vous pouvez cliquer sur l'icône de profil ci-dessus et entrer le mot de passe (admin) pour ouvrir le panneau de configuration et ajouter de nouveaux chapitres et pages personnalisés !",
    es: "Como administrador, puedes hacer clic en el icono de perfil arriba e introducir la contraseña (admin) para abrir el panel de control y añadir nuevos capítulos y páginas de libro personalizados."
  },
  "→ محادثة المقهى السابق": {
    en: "→ Previous: Café Conversation",
    fr: "→ Précédent : Conversation au Café",
    es: "→ Anterior: Conversación en Café"
  }
};

/**
 * Translates an entire HTML string dynamically by matching known Arabic phrases and replacing them
 * with their counterparts in English, French, or Spanish.
 */
export function translateBookHtml(html: string, targetLang: LanguageCode): string {
  if (targetLang === "ar") {
    return html; // Return original Arabic
  }

  let translatedHtml = html;

  // We sort keys by length descending to replace larger sentences first, preventing partial replacement of substrings
  const sortedPhrases = Object.keys(ARABIC_TRANSLATION_MAP).sort((a, b) => b.length - a.length);

  for (const phrase of sortedPhrases) {
    const translation = ARABIC_TRANSLATION_MAP[phrase]?.[targetLang];
    if (translation) {
      // Escape special regex characters in the phrase
      const escapedPhrase = phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      // Use regular expressions to replace the text inside the HTML body carefully
      const regex = new RegExp(escapedPhrase, "g");
      translatedHtml = translatedHtml.replace(regex, translation);
    }
  }

  // Also replace standard directions if they exist as labels in buttons
  translatedHtml = translatedHtml.replace(/السابق/g, targetLang === "en" ? "Previous" : targetLang === "fr" ? "Précédent" : "Anterior");
  translatedHtml = translatedHtml.replace(/التالي/g, targetLang === "en" ? "Next" : targetLang === "fr" ? "Suivant" : "Siguiente");

  return translatedHtml;
}

/**
 * Translates Chapter properties dynamically
 */
export function translateText(text: string, targetLang: LanguageCode): string {
  if (targetLang === "ar") return text;
  return ARABIC_TRANSLATION_MAP[text]?.[targetLang] || text;
}
