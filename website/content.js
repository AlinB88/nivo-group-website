/**
 * Public narrative for the NIVO concept site.
 * Arabic copy is a draft prepared with the owner's approval and should receive
 * final business review before the public site launches.
 */
export const brand = { name: 'NIVO', groupName: 'NIVO Group' };

export const locales = {
  en: {
    lang: 'en',
    dir: 'ltr',
    meta: {
      title: 'NIVO Group — A clearer way forward',
      description:
        'NIVO is a developing group experience built around thoughtful business guidance.',
    },
    header: {
      status: 'In development',
      switchLabel: 'العربية',
      switchAria: 'Switch to Arabic',
    },
    accessibility: {
      skip: 'Skip to chapters',
      home: 'NIVO Group home',
      scene: 'NIVO character progression',
      chapterNavigation: 'Chapter navigation',
      languageAnnouncement: 'English experience selected.',
    },
    footer: {
      statement: 'Guidance for business, in development.',
      backToTop: 'Back to top',
    },
    chapters: [
      {
        id: 'hero',
        wardrobe: 'base',
        number: '01',
        eyebrow: 'NIVO GROUP / THE GUIDE',
        title: ['A clearer', 'way forward.'],
        description:
          'NIVO is the helper, mentor, friend, and partner for business owners navigating work that needs care, privacy, and confident decisions.',
        note: 'Built around trust, not noise.',
        sceneCaption: 'A composed guide for important work.',
        label: 'Start the journey',
      },
      {
        id: 'advisor',
        wardrobe: 'advisor',
        number: '02',
        eyebrow: 'NIVO ADVISORY / IN DEVELOPMENT',
        title: ['LC work,', 'made clearer.'],
        description:
          'A developing workspace for reviewing proforma invoices, guiding LC applications, and comparing Swift details with the documents that matter.',
        note: 'Document clarity · application guidance · detail review',
        sceneCaption: 'A considered layer for LC workflows.',
        label: 'Explore Advisory',
      },
      {
        id: 'it',
        wardrobe: 'it',
        number: '03',
        eyebrow: 'NIVO IT SERVICES / IN DEVELOPMENT',
        title: ['Infrastructure,', 'with intent.'],
        description:
          'A developing IT offering around databases, server environments, customer support, and configurations shaped to fit how each business operates.',
        note: 'Databases · server environments · configurable combinations',
        sceneCaption: 'A practical environment for business technology.',
        label: 'Explore IT Services',
      },
      {
        id: 'logistics',
        wardrobe: 'logistics',
        number: '04',
        eyebrow: 'NIVO LOGISTICS / FUTURE CHAPTER',
        title: ['Every route', 'in view.'],
        description:
          'A future forwarding chapter intended to help customers compare shipping options, routes, timing, and available shipping lines.',
        note: 'A new chapter is being prepared.',
        sceneCaption: 'A future chapter for movement and choice.',
        label: 'View the next chapter',
      },
    ],
  },
  ar: {
    lang: 'ar',
    dir: 'rtl',
    meta: {
      title: 'نيفو — طريق أوضح إلى الأمام',
      description: 'نيفو تجربة مجموعة قيد التطوير، مبنية حول إرشاد الأعمال بعناية.',
    },
    header: {
      status: 'قيد التطوير',
      switchLabel: 'EN',
      switchAria: 'التبديل إلى اللغة الإنجليزية',
    },
    accessibility: {
      skip: 'انتقل إلى الفصول',
      home: 'الصفحة الرئيسية لمجموعة نيفو',
      scene: 'رحلة شخصية نيفو',
      chapterNavigation: 'التنقل بين الفصول',
      languageAnnouncement: 'تم اختيار التجربة العربية.',
    },
    footer: { statement: 'إرشاد للأعمال، قيد التطوير.', backToTop: 'العودة إلى الأعلى' },
    chapters: [
      {
        id: 'hero',
        wardrobe: 'base',
        number: '01',
        eyebrow: 'مجموعة نيفو / الدليل',
        title: ['طريق أوضح', 'إلى الأمام.'],
        description:
          'نيفو هو المساعد والمرشد والصديق والشريك لأصحاب الأعمال عند التعامل مع أعمال تتطلب العناية والخصوصية وقرارات واثقة.',
        note: 'مبني على الثقة، لا على الضوضاء.',
        sceneCaption: 'دليل هادئ للأعمال المهمة.',
        label: 'ابدأ الرحلة',
      },
      {
        id: 'advisor',
        wardrobe: 'advisor',
        number: '02',
        eyebrow: 'نيفو للخدمات الاستشارية / قيد التطوير',
        title: ['عمل الاعتمادات', 'المستندية، بوضوح أكبر.'],
        description:
          'مساحة عمل قيد التطوير لمراجعة الفواتير المبدئية، وتوجيه طلبات الاعتماد المستندي، ومقارنة تفاصيل سويفت بالمستندات ذات الصلة.',
        note: 'وضوح المستندات · توجيه الطلبات · مراجعة التفاصيل',
        sceneCaption: 'طبقة مدروسة لسير عمل الاعتمادات المستندية.',
        label: 'استكشف الخدمات الاستشارية',
      },
      {
        id: 'it',
        wardrobe: 'it',
        number: '03',
        eyebrow: 'نيفو لخدمات تقنية المعلومات / قيد التطوير',
        title: ['بنية تحتية،', 'بهدف واضح.'],
        description:
          'عرض تقني قيد التطوير حول قواعد البيانات وبيئات الخوادم ودعم العملاء والتكوينات المصممة لتناسب طريقة عمل كل شركة.',
        note: 'قواعد البيانات · بيئات الخوادم · تكوينات قابلة للدمج',
        sceneCaption: 'بيئة عملية لتقنية الأعمال.',
        label: 'استكشف خدمات تقنية المعلومات',
      },
      {
        id: 'logistics',
        wardrobe: 'logistics',
        number: '04',
        eyebrow: 'نيفو للخدمات اللوجستية / فصل مستقبلي',
        title: ['كل طريق', 'أمامك.'],
        description:
          'فصل مستقبلي في الشحن يهدف إلى مساعدة العملاء على مقارنة خيارات الشحن والمسارات والوقت وخطوط الشحن المتاحة.',
        note: 'يجري إعداد فصل جديد.',
        sceneCaption: 'فصل مستقبلي للحركة والاختيار.',
        label: 'اطلع على الفصل التالي',
      },
    ],
  },
};
