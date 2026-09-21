/* ==========================================================================
   HER JOURNEY — CINEMATIC INTERACTIVE LIFE-JOURNEY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       AUDIO STATE & CONTROL VARIABLE INITIALIZATION
       ---------------------------------------------------------------------- */
    const audioBtn = document.getElementById('audioToggle');
    let audioCtx = null;
    let audioPlaying = false;
    let synthTimer = null;
    let masterGain = null;

    /* ----------------------------------------------------------------------
       INTERNATIONALIZATION (TAMIL / ENGLISH) DICTIONARY & CONTROLLER
       ---------------------------------------------------------------------- */
    const i18n = {
        en: {
            page_title: "Her Journey — Before She Became My Mummy",
            audio_ambient: "Ambient Music",
            audio_on: "Music On",
            audio_off: "Music Off",
            customizer_btn: "📷 Live Photo Swapper",
            modal_title: "Live Photo Customizer",
            modal_sub: "Select your photos below to instantly preview them on Mummy's journey! <br><em>To save permanently, copy your photos into the <code>images/</code> folder using the filenames shown.</em>",
            modal_item_1: "1. Birth: <code>images/birth.jpg</code>",
            modal_item_2: "2. Age 3 Mother: <code>images/mother.jpg</code>",
            modal_item_3: "3. Third Standard Appa: <code>images/father.jpg</code>",
            modal_item_4: "4. Jaya Perima: <code>images/jaya-perima.jpg</code>",
            modal_item_5: "5. Thaayagam: <code>images/thaayagam.jpg</code>",
            modal_item_6: "6. College: <code>images/college.jpg</code>",
            modal_item_7: "7. Marriage: <code>images/marriage.jpg</code>",
            modal_item_8: "8. Sirumangalam First Job: <code>images/first-job.jpg</code>",
            modal_item_9: "9. 1999 Anna: <code>images/anna-1999.jpg</code>",
            modal_item_10: "10. 2007 Me: <code>images/me-2007.jpg</code>",
            modal_item_11: "11. Family 1 (Little moments): <code>images/family1.jpg</code>",
            modal_item_12: "12. Family 2 (Our home): <code>images/family2.jpg</code>",
            modal_item_13: "13. Family 3 (Ordinary days): <code>images/family3.jpg</code>",
            modal_item_14: "14. Family 4 (Her smile): <code>images/family4.jpg</code>",
            modal_item_15: "15. 2016 Chapter: <code>images/2016.jpg</code>",
            modal_item_16: "16. Children Standing Beside Her: <code>images/children.jpg</code>",
            modal_item_17: "17. Mummy Today: <code>images/today.jpg</code>",
            modal_item_18: "18. Final Birthday Photo: <code>images/final.jpg</code>",

            intro_1: "Every life has a story.",
            intro_2: "But some stories deserve to be remembered.",
            intro_3: "Before she became my Mummy...",
            intro_4: "...she was a little girl with a story of her own.",
            main_title: "HER JOURNEY",
            main_subtitle: "Before she became my Mummy,<br>she was a little girl with a story.",
            begin_btn: "BEGIN HER JOURNEY &rarr;",

            nav_title: "ROAD MAP",
            nav_birth: "Beginning",
            nav_mother: "First Loss",
            nav_father: "Second Loss",
            nav_jaya: "Jaya Perima",
            nav_thaayagam: "Thaayagam",
            nav_college: "College",
            nav_marriage: "Marriage",
            nav_job: "First Job",
            nav_1999: "1999",
            nav_2007: "2007",
            nav_family: "Our Family",
            nav_2016: "2016",
            nav_turning: "Turning Point",
            nav_today: "Today",
            nav_tomorrow: "Tomorrow",
            nav_reveal: "Birthday",

            ch1_badge: "CHAPTER 01",
            ch1_title: "THE BEGINNING",
            ch1_caption: "her beginning",
            ch1_alt: "Birth & Childhood",
            ch1_p1: "She was the youngest of three children.",
            ch1_p2: "Her parents had married later in her father's life.",
            ch1_p3: "Her beginning itself came with difficulties.",
            ch1_p4: "But somehow, she made it into this world.",
            ch1_quote: `"Some stories begin quietly.<br>Hers began by surviving."`,

            ch2_badge: "CHAPTER 02",
            ch2_title: "THE FIRST LOSS",
            ch2_p1: "When she was only three, she lost her mother.",
            ch2_p2: "She was too young to understand what she had lost.",
            ch2_quote: "Her father became her world.",

            ch3_badge: "CHAPTER 03",
            ch3_title: "THE SECOND LOSS",
            ch3_p1: "Years passed with her father.",
            ch3_p2: "She remembers him simply —",
            ch3_p3: "white hair, white dhoti, and the familiar presence of Appa.",
            ch3_p4: "Then, while she was in third standard, she lost him too.",
            ch3_quote: `"But someone was about to change her path."`,

            ch4_badge: "CHAPTER 04",
            ch4_title: "SOMEONE CHOSE HER FUTURE",
            ch4_p1: "After losing her father, some relatives thought she could be sent away for household work.",
            ch4_p2: "But Jaya Perima refused.",
            ch4_p3: "She believed she deserved an education.",
            ch4_p4: "So she took her to Thaayagam.",
            ch4_divider: "THE ROAD CHANGED HERE.",

            ch5_badge: "CHAPTER 05",
            ch5_title: "THAAYAGAM",
            ch5_p1: "Life at Thaayagam was not easy.",
            ch5_p2: "Food was limited. Old clothes felt precious.",
            ch5_p3: "But she studied, learned devotional songs, and found small moments of peace.",
            ch5_quote: `"She learned to live with less, without letting her dreams become less."`,

            ch6_badge: "CHAPTER 06",
            ch6_title: "THE GIRL WHO GREW",
            ch6_caption: "young Amma",
            ch6_alt: "College Days",
            ch6_p1: "She grew up.",
            ch6_p2: "She joined college, studied, made friends, and finally experienced a little normal happiness.",
            ch6_quote: `"But life had another chapter waiting."`,

            ch7_badge: "CHAPTER 07",
            ch7_title: "A CHAPTER SHE DIDN'T CHOOSE",
            ch7_caption: "marriage day",
            ch7_alt: "Marriage Day",
            ch7_p1: "She and Appa had a 16-year age difference.",
            ch7_p2: "The marriage happened because of circumstances, not because it was the life she had imagined.",
            ch7_p3: "The beginning was difficult, with frequent fights and painful moments.",
            ch7_quote: `"A new chapter was waiting for her."`,

            ch8_badge: "CHAPTER 08",
            ch8_title: "THE TURNING POINT",
            ch8_caption: "Sirumangalam Government Job",
            ch8_alt: "First Job Workplace",
            ch8_p1: "At one point, someone questioned how the marriage could work without a job.",
            ch8_p2: "Within the very next month, she got a government job.",
            ch8_quote: "Her first posting was at Sirumangalam.",

            ch9_title: "She Became a Mother",
            ch9_caption: "Anna (1999)",
            ch9_alt: "Anna as a Baby",
            ch9_p1: "Then, she became a mother.",
            ch9_p2: "Her first son was born.",
            ch9_quote: "A new responsibility. A new reason to keep going.",

            ch10_title: "I Arrived",
            ch10_caption: "Me (2007)",
            ch10_alt: "Baby Me & Mummy",
            ch10_p1: "Eight years later, I arrived.",
            ch10_p2: "Our little family was complete.",
            ch10_p3: "Life was simple — small fights, small happiness, and countless ordinary memories.",
            ch10_quote: `"Nothing extraordinary. Yet everything meant everything."`,

            ch11_badge: "CHAPTER 11",
            ch11_title: "THE LIFE SHE BUILT",
            ch11_sub: "Memories lying on a table in sunlight",
            ch11_item1_cap: "little moments",
            ch11_item1_alt: "Little moments",
            ch11_item2_cap: "our home",
            ch11_item2_alt: "Our home",
            ch11_item3_cap: "ordinary days",
            ch11_item3_alt: "Ordinary days",
            ch11_item4_cap: "her smile",
            ch11_item4_alt: "Her smile",

            ch12_title: "A Difficult Chapter",
            ch12_caption: "worry & fear",
            ch12_alt: "2016 Memory",
            ch12_p1: "My brother faced health problems.",
            ch12_p2: "Once again, Mummy became deeply worried.",
            ch12_p3: "The person who had always taken care of everyone was suddenly struggling herself.",
            ch12_p4: "Our whole family was worried.",
            ch12_fade: "But her story does not end here.",

            turn_step1: "She carried everyone.",
            turn_step2: "Her family.",
            turn_step3: "Her children.",
            turn_step4: "Her responsibilities.",
            turn_step5: "And now...",
            turn_step6: "it's our turn.",
            turn_cap: "beside her always",
            turn_alt: "Children Standing Beside Her",
            turn_quote: `"The children she spent her life worrying about are here to stand beside her."`,

            ch13_badge: "CHAPTER 13",
            ch13_title: "TODAY",
            ch13_caption: "Mummy today",
            ch13_alt: "Mummy Today",
            ch13_salutation: "Mummy,",
            ch13_p1: "You have already been strong for longer than anyone knows.",
            ch13_p2: "You don't have to carry everything alone anymore.",
            ch13_quote: "You have us.",

            ch14_badge: "FINAL CHAPTER",
            ch14_title: "HER TOMORROW",
            ch14_p1: "You spent so many years making sure we were okay.",
            ch14_p2: "Now it's our turn to walk beside you.",
            ch14_p3: "Whatever comes next, we'll face it together.",
            ch14_line1: "Your story is not ending here.",
            ch14_line2: "This is only the beginning.",

            reveal_alt: "Happy Birthday Mummy",
            poem_line1: "Before you were our Mummy,",
            poem_line2: "you were a little girl who survived so much.",
            poem_line3: "You grew.",
            poem_line4: "You kept going.",
            poem_line5: "You built a family.",
            poem_line6: "You became our Mummy.",
            reveal_love_title: "HAPPY BIRTHDAY, MUMMY ❤️",
            reveal_love_from: "Thank you for everything.",
            reveal_quote: `"Your future is still waiting for you.<br>We'll walk with you."`,
            restart_btn: "Walk through her journey again ↺"
        },
        ta: {
            page_title: "அவளின் பயணம் — அவங்க எனக்கு மம்மியா ஆகறதுக்கு முன்னாடி",
            audio_ambient: "பின்னணி இசை",
            audio_on: "இசை: ஆன்",
            audio_off: "இசை: ஆஃப்",
            customizer_btn: "📷 புகைப்பட மாற்றி",
            modal_title: "புகைப்பட மாற்றி",
            modal_sub: "மம்மியின் பயணத்தில் உங்கள் புகைப்படங்களை உடனுக்குடன் பார்க்க கீழே தேர்ந்தெடுக்கவும்! <br><em>நிரந்தரமாக சேமிக்க, காட்டப்பட்டுள்ள கோப்புப் பெயர்களுடன் உங்கள் புகைப்படங்களை <code>images/</code> கோப்புறையில் நகலெடுக்கவும்.</em>",
            modal_item_1: "1. பிறப்பு: <code>images/birth.jpg</code>",
            modal_item_2: "2. 3 வயதில் தாய் இழப்பு: <code>images/mother.jpg</code>",
            modal_item_3: "3. 3-ஆம் வகுப்பில் அப்பா இழப்பு: <code>images/father.jpg</code>",
            modal_item_4: "4. ஜெயா பெரிம்மா: <code>images/jaya-perima.jpg</code>",
            modal_item_5: "5. தாயகம்: <code>images/thaayagam.jpg</code>",
            modal_item_6: "6. கல்லூரி: <code>images/college.jpg</code>",
            modal_item_7: "7. திருமணம்: <code>images/marriage.jpg</code>",
            modal_item_8: "8. சிறுமங்கலம் முதல் வேலை: <code>images/first-job.jpg</code>",
            modal_item_9: "9. 1999 அண்ணா: <code>images/anna-1999.jpg</code>",
            modal_item_10: "10. 2007 நான்: <code>images/me-2007.jpg</code>",
            modal_item_11: "11. குடும்பம் 1 (சின்ன சின்ன தருணங்கள்): <code>images/family1.jpg</code>",
            modal_item_12: "12. குடும்பம் 2 (எங்கள் இல்லம்): <code>images/family2.jpg</code>",
            modal_item_13: "13. குடும்பம் 3 (சாதாரண நாட்கள்): <code>images/family3.jpg</code>",
            modal_item_14: "14. குடும்பம் 4 (அவளின் புன்னகை): <code>images/family4.jpg</code>",
            modal_item_15: "15. 2016 அத்தியாயம்: <code>images/2016.jpg</code>",
            modal_item_16: "16. அவளுடன் நிற்கும் பிள்ளைகள்: <code>images/children.jpg</code>",
            modal_item_17: "17. மம்மி இன்று: <code>images/today.jpg</code>",
            modal_item_18: "18. பிறந்தநாள் புகைப்படம்: <code>images/final.jpg</code>",

            intro_1: "ஒவ்வொரு வாழ்க்கையிலும் ஒரு கதை இருக்கு.",
            intro_2: "ஆனா சில கதைகளை நாம என்னைக்குமே மறக்கக் கூடாது.",
            intro_3: "அவங்க எனக்கு மம்மியா ஆகறதுக்கு முன்னாடி...",
            intro_4: "...அவங்களும் ஒரு சின்னப் பொண்ணா சொந்தக் கதையோட தான் இருந்தாங்க.",
            main_title: "அவளின் பயணம்",
            main_subtitle: "அவங்க எனக்கு மம்மியா ஆகறதுக்கு முன்னாடி,<br>ஒரு சின்னப் பொண்ணா சொந்தக் கதையோட இருந்தாங்க.",
            begin_btn: "அவளின் பயணத்தை தொடங்குங்கள் &rarr;",

            nav_title: "பயணப் பாதை",
            nav_birth: "ஆரம்பம்",
            nav_mother: "முதல் இழப்பு",
            nav_father: "இரண்டாம் இழப்பு",
            nav_jaya: "ஜெயா பெரிம்மா",
            nav_thaayagam: "தாயகம்",
            nav_college: "கல்லூரி",
            nav_marriage: "திருமணம்",
            nav_job: "முதல் வேலை",
            nav_1999: "1999",
            nav_2007: "2007",
            nav_family: "எங்கள் குடும்பம்",
            nav_2016: "2016",
            nav_turning: "திருப்புமுனை",
            nav_today: "இன்று",
            nav_tomorrow: "நாளை",
            nav_reveal: "பிறந்தநாள்",

            ch1_badge: "அத்தியாயம் 01",
            ch1_title: "ஆரம்பம்",
            ch1_caption: "அவளுடைய ஆரம்பம்",
            ch1_alt: "பிறப்பும் சிறுவயதும்",
            ch1_p1: "மூணு குழந்தைகளில் அவ தான் எல்லாருக்கும் கடைசி.",
            ch1_p2: "அவளோட அப்பாவுக்கு கொஞ்சம் வயசான பிறகு தான் திருமணம் ஆச்சு.",
            ch1_p3: "அவ பிறந்த போதே பல கஷ்டங்களோட தான் பிறந்தா.",
            ch1_p4: "ஆனாலும், எப்படி எல்லாமோ தாண்டி இந்த உலகத்துக்குள்ள வந்தா.",
            ch1_quote: `"சில கதைகள் அமைதியா தொடங்கும்.<br>அவளோட கதை ஜெயிக்கிறதுல தான் தொடங்குச்சு."`,

            ch2_badge: "அத்தியாயம் 02",
            ch2_title: "முதல் இழப்பு",
            ch2_p1: "மூணு வயசு இருக்கும் போது, அவளோட அம்மாவை இழந்துட்டா.",
            ch2_p2: "என்ன இழந்திருக்கோம்னு புரியாத சின்ன வயசு அவளுக்கு.",
            ch2_quote: "அப்போ அவளோட அப்பாவே அவளோட உலகமானார்.",

            ch3_badge: "அத்தியாயம் 03",
            ch3_title: "இரண்டாம் இழப்பு",
            ch3_p1: "அப்பாவோட சில வருஷங்கள் கடந்துச்சு.",
            ch3_p2: "அவளுக்கு அவரை பத்தின நினைவுகள் ரொம்ப எளிமையானது —",
            ch3_p3: "வெள்ளை முடி, வெள்ளை வேட்டி, அப்புறம் அன்பான அப்பாவோட நிழல்.",
            ch3_p4: "அவ மூணாவது படிக்கும் போது, அந்த அப்பாவையும் இழந்துட்டா.",
            ch3_quote: `"ஆனா அவளோட பாதையை மாற்ற ஒருத்தர் வரப்போறாங்க."`,

            ch4_badge: "அத்தியாயம் 04",
            ch4_title: "அவளுடைய எதிர்காலத்தை ஒருவர் மாற்றி அமைத்தார்",
            ch4_p1: "அப்பாவை இழந்த பிறகு, வீட்டு வேலைக்கு அனுப்பிச்சிரலாம்னு சில சொந்தக்காரங்க நினைச்சாங்க.",
            ch4_p2: "ஆனா ஜெயா பெரிம்மா அதை ஒத்துக்கவே இல்லை.",
            ch4_p3: "அவ கண்டிப்பா படிக்கணும்னு பெரிம்மா உறுதியா நம்பினாங்க.",
            ch4_p4: "அதனால அவளை தாயகத்துக்கு கூட்டிட்டு போனாங்க.",
            ch4_divider: "அவளோட வாழ்க்கைப் பாதை இங்க தான் மாறுச்சு.",

            ch5_badge: "அத்தியாயம் 05",
            ch5_title: "தாயகம்",
            ch5_p1: "தாயகத்துல வாழ்க்கை அவ்வளவு சுலபமா இல்லை.",
            ch5_p2: "அளவான உணவு. பழைய துணிகள் தான் அங்க பொக்கிஷம்.",
            ch5_p3: "ஆனாலும் நல்லா படிச்சா, பக்தி பாடல்கள் கத்துக்கிட்டா, சின்ன சின்ன சந்தோஷங்களை அங்க தேடிக்கிட்டா.",
            ch5_quote: `"இருக்கிறதை வச்சு வாழ கத்துக்கிட்டா, ஆனா அவளோட கனவுகளை மட்டும் சுருக்கிக்கவே இல்லை."`,

            ch6_badge: "அத்தியாயம் 06",
            ch6_title: "வளர்ந்த சிறுமி",
            ch6_caption: "இளமைக்கால மம்மி",
            ch6_alt: "கல்லூரி நாட்கள்",
            ch6_p1: "அவ வளர்ந்து பெரியவளானா.",
            ch6_p2: "கல்லூரில சேர்ந்து படிச்சா, தோழிகள் கிடைச்சாங்க, கடைசியா சாதாரண சந்தோஷத்தை அனுபவிச்சா.",
            ch6_quote: `"ஆனா வாழ்க்கை அவளுக்காக இன்னொரு அத்தியாயத்தை வைச்சிருந்துச்சு."`,

            ch7_badge: "அத்தியாயம் 07",
            ch7_title: "அவள் விரும்பாத ஒரு அத்தியாயம்",
            ch7_caption: "திருமண நாள்",
            ch7_alt: "திருமண நாள்",
            ch7_p1: "அவளுக்கும் அப்பாவுக்கும் 16 வயசு வித்தியாசம்.",
            ch7_p2: "சூழ்நிலையால தான் இந்த திருமணம் நடந்துச்சு, அவ நினைச்சு பார்த்த வாழ்க்கை இது இல்லை.",
            ch7_p3: "ஆரம்பம் ரொம்பவே கஷ்டமா இருந்துச்சு, அடிக்கடி சண்டைகளும் வலி நிறைந்த தருணங்களும் வந்துச்சு.",
            ch7_quote: `"அவளுக்காக ஒரு புதிய அத்தியாயம் காத்துக்கொண்டிருந்தது."`,

            ch8_badge: "அத்தியாயம் 08",
            ch8_title: "திருப்புமுனை",
            ch8_caption: "சிறுமங்கலம் அரசு வேலை",
            ch8_alt: "முதல் வேலை இடம்",
            ch8_p1: "ஒரு கட்டத்துல, வேலை இல்லாம இந்த வாழ்க்கை எப்படி சரியாகும்னு யாரோ கேள்வி கேட்டாங்க.",
            ch8_p2: "அடுத்த மாசமே அவளுக்கு அரசு வேலை கிடைச்சது.",
            ch8_quote: "அவளோட முதல் வேலை சிறுமங்கலத்துல அமைஞ்சது.",

            ch9_title: "அவள் தாயானாள்",
            ch9_caption: "அண்ணா (1999)",
            ch9_alt: "குழந்தையாக அண்ணா",
            ch9_p1: "அப்புறம், அவ ஒரு அம்மாவானாள்.",
            ch9_p2: "அவளோட மூத்த மகன் பிறந்தான்.",
            ch9_quote: "ஒரு புதிய பொறுப்பு. வாழ்க்கையில தொடர்ந்து ஓட ஒரு புதிய காரணம்.",

            ch10_title: "நான் பிறந்தேன்",
            ch10_caption: "நான் (2007)",
            ch10_alt: "குழந்தையாக நானும் மம்மியும்",
            ch10_p1: "எட்டு வருஷம் கழிச்சு, நான் வந்தேன்.",
            ch10_p2: "நம்ம சின்ன குடும்பம் முழுமை பெற்றுச்சு.",
            ch10_p3: "வாழ்க்கை ரொம்ப எளிமையா போச்சு — சின்ன சின்ன சண்டைகள், சின்ன சந்தோஷங்கள், அப்புறம் நிறைய அழகான நினைவுகள்.",
            ch10_quote: `"பெரிசா எதுவும் இல்லை. ஆனா அது தான் எங்களுக்கு எல்லாமே."`,

            ch11_badge: "அத்தியாயம் 11",
            ch11_title: "அவள் உருவாக்கிய வாழ்க்கை",
            ch11_sub: "சூரிய ஒளியில் மேஜை மேல் சிதறிய நினைவுகள்",
            ch11_item1_cap: "சின்ன சின்ன தருணங்கள்",
            ch11_item1_alt: "சின்ன சின்ன தருணங்கள்",
            ch11_item2_cap: "எங்கள் இல்லம்",
            ch11_item2_alt: "எங்கள் இல்லம்",
            ch11_item3_cap: "சாதாரண நாட்கள்",
            ch11_item3_alt: "சாதாரண நாட்கள்",
            ch11_item4_cap: "அவளின் புன்னகை",
            ch11_item4_alt: "அவளின் புன்னகை",

            ch12_title: "ஒரு கடினமான அத்தியாயம்",
            ch12_caption: "கவலையும் பயமும்",
            ch12_alt: "2016 நினைவு",
            ch12_p1: "என் அண்ணனுக்கு உடம்பு சரியில்லாம போச்சு.",
            ch12_p2: "மறுபடியும் மம்மி ரொம்ப கவலைப்பட ஆரம்பிச்சாங்க.",
            ch12_p3: "எல்லாரையும் தாங்குன அவங்களே திடீர்னு கஷ்டப்பட ஆரம்பிச்சாங்க.",
            ch12_p4: "நம்ம குடும்பமே ரொம்ப கவலையில இருந்துச்சு.",
            ch12_fade: "ஆனா அவளோட கதை இதோட முடியல.",

            turn_step1: "எல்லாரையும் அவங்க தாங்குனாங்க.",
            turn_step2: "அவங்களோட குடும்பத்தை.",
            turn_step3: "அவங்களோட குழந்தைகளை.",
            turn_step4: "அவங்களோட பொறுப்புகளை.",
            turn_step5: "இப்போ...",
            turn_step6: "எங்களோட முறை.",
            turn_cap: "என்றும் அவளுடன்",
            turn_alt: "அவளுடன் நிற்கும் பிள்ளைகள்",
            turn_quote: `"வாழ்க்கை முழுக்க கவலைப்பட்டு வளர்த்த பிள்ளைகள், இப்போ அவங்களோட துணை நிற்க வராங்க."`,

            ch13_badge: "அத்தியாயம் 13",
            ch13_title: "இன்று",
            ch13_caption: "மம்மி இன்று",
            ch13_alt: "மம்மி இன்று",
            ch13_salutation: "மம்மி,",
            ch13_p1: "யாருக்கும் தெரியாத அளவுக்கு நீங்க ஏற்கனவே ரொம்ப வருஷமா தைரியமா இருந்துட்டீங்க.",
            ch13_p2: "இனிமே எல்லாத்தையும் நீங்க தனியா சுமக்க வேண்டாம்.",
            ch13_quote: "உங்களுக்கு நாங்க இருக்கோம்.",

            ch14_badge: "கடைசி அத்தியாயம்",
            ch14_title: "அவளின் நாளை",
            ch14_p1: "நாங்க நல்லா இருக்கணும்னு எவ்வளவோ வருஷம் உழைச்சீங்க.",
            ch14_p2: "இப்போ நாங்க உங்க கூடவே நடந்து வர போறோம்.",
            ch14_p3: "அடுத்து என்ன வந்தாலும், நாம ஒன்னா சேர்ந்தே எதிர்கொள்வோம்.",
            ch14_line1: "உங்க கதை இதோட முடியல.",
            ch14_line2: "இது ஒரு புதிய ஆரம்பம் தான்.",

            reveal_alt: "இனிய பிறந்தநாள் வாழ்த்துக்கள் மம்மி",
            poem_line1: "நீங்க எங்களுக்கு மம்மியா ஆகுறதுக்கு முன்னாடி,",
            poem_line2: "எவ்வளவோ கஷ்டங்களை தாங்கி ஜெயிச்ச ஒரு சின்னப் பொண்ணு.",
            poem_line3: "வளர்ந்தீங்க.",
            poem_line4: "தொடர்ந்து ஓடினீங்க.",
            poem_line5: "ஒரு அழகான குடும்பத்தை உருவாக்கினீங்க.",
            poem_line6: "எங்களுக்கு மம்மியா ஆனீங்க.",
            reveal_love_title: "இனிய பிறந்தநாள் வாழ்த்துக்கள், மம்மி ❤️",
            reveal_love_from: "எல்லாத்துக்கும் ரொம்ப நன்றி.",
            reveal_quote: `"உங்க எதிர்காலம் உங்களுக்காக காத்துக்கிட்டு இருக்கு.<br>நாம சேர்ந்து நடப்போம்."`,
            restart_btn: "அவளின் பயணத்தை மீண்டும் பார்க்க ↺"
        }
    };

    let currentLang = localStorage.getItem('preferredLang') || 'ta';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        const langTextSpan = document.getElementById('langText');
        if (lang === 'ta') {
            document.body.classList.add('lang-ta');
            if (langTextSpan) langTextSpan.textContent = 'English';
        } else {
            document.body.classList.remove('lang-ta');
            if (langTextSpan) langTextSpan.textContent = 'தமிழ்';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key] !== undefined) {
                el.innerHTML = i18n[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (i18n[lang] && i18n[lang][key] !== undefined) {
                el.setAttribute('alt', i18n[lang][key]);
            }
        });

        // Update audio button label if present
        const musicText = audioBtn?.querySelector('.music-text');
        if (musicText) {
            if (audioPlaying) {
                musicText.textContent = lang === 'ta' ? 'இசை: ஆன்' : 'Music On';
            } else {
                musicText.textContent = lang === 'ta' ? 'பின்னணி இசை' : 'Ambient Music';
            }
        }
    }

    const langToggleBtn = document.getElementById('langToggle');
    langToggleBtn?.addEventListener('click', () => {
        const nextLang = currentLang === 'en' ? 'ta' : 'en';
        setLanguage(nextLang);
    });

    // Initialize Language safely
    setLanguage(currentLang);

    /* ----------------------------------------------------------------------
       1. OPENING EXPERIENCE SEQUENCE CONTROLLER
       ---------------------------------------------------------------------- */
    const openingScreen = document.getElementById('openingExperience');
    const textStep1 = document.querySelector('.text-step-1');
    const textStep2 = document.querySelector('.text-step-2');
    const textStep3 = document.querySelector('.text-step-3');
    const textStep4 = document.querySelector('.text-step-4');
    const titleReveal = document.getElementById('titleReveal');
    const beginBtn = document.getElementById('beginBtn');
    const checkpointNav = document.getElementById('checkpointNav');

    setTimeout(() => textStep1?.classList.add('visible'), 800);
    setTimeout(() => textStep2?.classList.add('visible'), 2800);
    setTimeout(() => textStep3?.classList.add('visible'), 4800);
    setTimeout(() => textStep4?.classList.add('visible'), 6800);

    setTimeout(() => {
        titleReveal?.classList.remove('hidden');
        titleReveal?.classList.add('visible');
    }, 8800);

    beginBtn?.addEventListener('click', () => {
        openingScreen.classList.add('passed');
        checkpointNav.classList.add('active-nav');
        document.body.style.overflow = 'auto';

        if (!audioPlaying) {
            toggleAudio();
        }

        const firstCh = document.getElementById('ch-birth');
        if (firstCh) {
            firstCh.scrollIntoView({ behavior: 'smooth' });
        }
    });

    /* ----------------------------------------------------------------------
       2. WEB AUDIO API AMBIENT PIANO SYNTHESIZER
       ---------------------------------------------------------------------- */
    const chords = [
        [220.00, 261.63, 329.63, 392.00], // A minor 7
        [174.61, 220.00, 261.63, 329.63], // F major 7
        [130.81, 164.81, 196.00, 246.94], // C major 7
        [146.83, 174.61, 220.00, 261.63]  // D minor 7
    ];
    let currentChordIndex = 0;

    function initAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }
    }

    function playSoftChord() {
        if (!audioPlaying || !audioCtx) return;

        const now = audioCtx.currentTime;
        const currentChord = chords[currentChordIndex];
        currentChordIndex = (currentChordIndex + 1) % chords.length;

        currentChord.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 2.5 + (idx * 0.2));
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.0);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(now + (idx * 0.15));
            osc.stop(now + 7.5);
        });

        synthTimer = setTimeout(playSoftChord, 6500);
    }

    function toggleAudio() {
        initAudioContext();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        audioPlaying = !audioPlaying;

        if (audioPlaying) {
            audioBtn.classList.add('playing');
            audioBtn.querySelector('.music-text').textContent = currentLang === 'ta' ? 'இசை: ஆன்' : 'Music On';
            playSoftChord();
        } else {
            audioBtn.classList.remove('playing');
            audioBtn.querySelector('.music-text').textContent = currentLang === 'ta' ? 'இசை: ஆஃப்' : 'Music Off';
            clearTimeout(synthTimer);
        }
    }

    audioBtn?.addEventListener('click', toggleAudio);

    /* ----------------------------------------------------------------------
       3. AMBIENT PARTICLES CANVAS ENGINE (DUST / PETALS / BIRDS)
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('ambientCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let currentParticleMode = 'dust'; // 'dust', 'petals', 'birds'

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Class handling dust, flower petals, and flying birds
    class Particle {
        constructor(mode = 'dust') {
            this.mode = mode;
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            if (this.mode === 'petals') {
                this.size = Math.random() * 4 + 3;
                this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.02;
                this.alpha = Math.random() * 0.6 + 0.2;
            } else if (this.mode === 'birds') {
                this.x = -50 - Math.random() * 200;
                this.y = Math.random() * (height * 0.4);
                this.size = Math.random() * 12 + 10;
                this.speedX = Math.random() * 1.8 + 1.2;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.wingPhase = Math.random() * Math.PI * 2;
                this.alpha = Math.random() * 0.4 + 0.2;
            } else { // dust / gold
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.4 - 0.1;
                this.alpha = Math.random() * 0.5 + 0.15;
                this.color = Math.random() > 0.4 ? '212, 175, 55' : '243, 229, 171';
            }
        }

        update() {
            if (this.mode === 'petals') {
                this.x += Math.sin(this.y * 0.01) * 0.8;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                if (this.y > height + 20) {
                    this.reset();
                    this.y = -10;
                }
            } else if (this.mode === 'birds') {
                this.x += this.speedX;
                this.y += this.speedY;
                this.wingPhase += 0.12;
                if (this.x > width + 100) {
                    this.reset();
                }
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < 0 || this.x < 0 || this.x > width) {
                    this.reset();
                    this.y = height + 10;
                }
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;

            if (this.mode === 'petals') {
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = 'rgba(255, 250, 245, 0.85)';
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.mode === 'birds') {
                ctx.translate(this.x, this.y);
                ctx.strokeStyle = 'rgba(40, 35, 30, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                const wingY = Math.sin(this.wingPhase) * 6;
                ctx.moveTo(-this.size, wingY);
                ctx.quadraticCurveTo(-this.size / 2, -wingY, 0, 0);
                ctx.quadraticCurveTo(this.size / 2, -wingY, this.size, wingY);
                ctx.stroke();
            } else { // dust / gold
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgba(${this.color}, 0.5)`;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    function setParticleMode(newMode) {
        if (currentParticleMode === newMode) return;
        currentParticleMode = newMode;
        particles = [];
        const count = newMode === 'birds' ? 8 : (newMode === 'petals' ? 25 : 40);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(newMode));
        }
    }

    setParticleMode('dust');

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ----------------------------------------------------------------------
       4. WINDING ZIG-ZAG SVG PATH SCROLL TRACKER
       ---------------------------------------------------------------------- */
    const pathProgress = document.getElementById('journeyCurveProgress');
    let pathLength = 0;

    if (pathProgress) {
        pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDasharray = pathLength;
        pathProgress.style.strokeDashoffset = pathLength;
    }

    function updatePathOnScroll() {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / (maxScroll || 1)));

        if (pathProgress && pathLength) {
            const drawLength = pathLength * scrollFraction;
            pathProgress.style.strokeDashoffset = pathLength - drawLength;
        }
    }

    window.addEventListener('scroll', updatePathOnScroll);
    updatePathOnScroll();

    /* ----------------------------------------------------------------------
       5. INTERSECTION OBSERVER FOR CARDS, CHECKPOINTS & MOODS
       ---------------------------------------------------------------------- */
    const chapterSections = document.querySelectorAll('.chapter-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.05
    };

    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                const targetId = entry.target.getAttribute('id');

                // Update active checkpoint in sidebar
                navItems.forEach(item => {
                    if (item.getAttribute('data-target') === targetId) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                // Trigger visual particles & audio adjustments per chapter
                if (targetId === 'ch-mother' || targetId === 'ch-father') {
                    setParticleMode('petals');
                } else if (targetId === 'ch-college' || targetId === 'ch-tomorrow') {
                    setParticleMode('birds');
                } else {
                    setParticleMode('dust');
                }

                // Lower volume during 2016 chapter
                if (masterGain && audioCtx) {
                    if (targetId === 'ch-2016') {
                        masterGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1);
                    } else {
                        masterGain.gain.linearRampToValueAtTime(0.8, audioCtx.currentTime + 1);
                    }
                }

                if (targetId === 'ch-turning') {
                    triggerTurningPointSequence();
                }
            }
        });
    }, observerOptions);

    chapterSections.forEach(section => chapterObserver.observe(section));

    // Nav click jumping
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ----------------------------------------------------------------------
       6. TURNING POINT SEQUENTIAL REVEAL
       ---------------------------------------------------------------------- */
    let turningTriggered = false;
    function triggerTurningPointSequence() {
        if (turningTriggered) return;
        turningTriggered = true;

        const steps = [
            document.querySelector('.t-step-1'),
            document.querySelector('.t-step-2'),
            document.querySelector('.t-step-3'),
            document.querySelector('.t-step-4'),
            document.querySelector('.t-step-5'),
            document.querySelector('.t-step-6'),
            document.getElementById('childrenStandBlock')
        ];

        steps.forEach((step, index) => {
            if (step) {
                setTimeout(() => {
                    step.classList.add('visible');
                }, index * 600);
            }
        });
    }

    /* ----------------------------------------------------------------------
       7. LIVE PHOTO CUSTOMIZER MODAL
       ---------------------------------------------------------------------- */
    const openModalBtn = document.getElementById('openCustomizerBtn');
    const closeModalBtn = document.getElementById('closeCustomizerBtn');
    const customizerModal = document.getElementById('customizerModal');
    const fileInputs = document.querySelectorAll('.customizer-item input[type="file"]');

    openModalBtn?.addEventListener('click', () => customizerModal.classList.remove('hidden'));
    closeModalBtn?.addEventListener('click', () => customizerModal.classList.add('hidden'));

    customizerModal?.addEventListener('click', (e) => {
        if (e.target === customizerModal) {
            customizerModal.classList.add('hidden');
        }
    });

    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const targetImgId = input.getAttribute('data-target');
            const targetImg = document.getElementById(targetImgId);

            if (file && targetImg) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    targetImg.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    /* ----------------------------------------------------------------------
       8. RESTART JOURNEY BUTTON
       ---------------------------------------------------------------------- */
    const restartBtn = document.getElementById('restartBtn');
    restartBtn?.addEventListener('click', () => {
        openingScreen.classList.remove('passed');
        checkpointNav.classList.remove('active-nav');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
