const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// مسار لعرض شجرة العائلة
app.get('/api/family', async (req, res) => {
    try {
        // في البيئة الحقيقية استبدل هذا بالاتصال بالخادم الرئيسي
    const treeData = {
  "name": "عبيريد",
  "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
  "children": [
    {
      "name": "غازي",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": [
  {
    "name": "عبدالرحمن",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "صالح",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "راكان",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "غسان",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "الوليد",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "عبدالرحمن",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "يوسف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ناصر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "ياسر",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "يوسف",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "سامي",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عادل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "وليد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "طارق",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "ناصر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "جمال",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "ناصر",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "تميم",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "عمرو",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "ثابت",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "أحمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "ناصر",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "مالك",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "عبدالباري",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبيريد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالعزيز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فيصل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "عبدالعزيز",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "نايف",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "يوسف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "زيد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "أحمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "نواف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مراد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "غازي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "مشاري",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "باسل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "غسان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالمجيد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "طارق",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "معاذ",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "بندر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالحكيم",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "أحمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
	]
      },
      {
        "name": "عطا الله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "حسين",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "عبدالله",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "غازي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "سيف",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "حاتم",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "تركي",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "سطام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "أيمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "مصيبيح (عبيد)",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "رائد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "راكان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "هشام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "حسام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مالك",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبيد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "سلطان",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "طلال",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "نواف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "بندر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "محمد",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "بدر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "حماد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ممدوح",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "بدر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "منصور",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مازن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "ناصر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "حازم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عمر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "ماجد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "ثامر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "جابر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "أحمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "حسام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "عبيّد (عبدالله)",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالإله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مصعب",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "حاتم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "حاكم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "سعود",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عماد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "تركي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عابد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سعود",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سيف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "فيصل",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عمر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالرحمن",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عادل",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "ماجد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "مالك",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "يوسف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عبدالعزيز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عبداللطيف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عمر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  }
]
    },
    {
      "name": "ناصر",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": []
    },
    {
      "name": "غزاي",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": [
  {
    "name": "إبراهيم",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "دحيم",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "بدر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "سيف",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "بسام",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "عبدالله",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "بندر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ماجد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فارس",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مشعل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "بادي",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "تركي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "تركي",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "ابراهيم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "إبراهيم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فيصل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "معاذ",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "تركي",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سعود",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "سعد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سامر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "إبراهيم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالملك",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "أحمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "سهيل",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "ذعار",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سعود",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سهيل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "فارس",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "زياد",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ريان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "أحمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "متعب",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "جمال",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "أحمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "نايف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "نايف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "نياف",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "نايف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "طارق",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "زياد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "أحمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "متعب",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "فيصل",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عزام",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "غيث",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "علي",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "رائد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "معتز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  }
]
    },
    {
      "name": "تركي",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": []
    },
    {
      "name": "بدر",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": [
  {
    "name": "دليم",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "بدر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "شاهر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "بدر",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "متعب",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عامر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سطام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "أديب",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "عساف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "متعب",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "طلال",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": [
              {
                "name": "متعب",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              },
              {
                "name": "بدر",
                "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
                "children": []
              }
            ]
          },
          {
            "name": "بدر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "إبراهيم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "حسام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "أنس",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالرحمن",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عبدالعزيز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "عبدالمجيد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "سلطان",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "مسحل",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "فواز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالاله",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فيصل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سيف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مالك",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ثنيان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عوض",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "نواف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فيصل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "فهد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "دليم",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فواز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عزام",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "المهند",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "نايف",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "فايز",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فارس",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "سامي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "زايد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "فيصل",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عامر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "منصور",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "سفر",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "تركي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "غازي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالمجيد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عساف",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مشاري",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عمر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "بدر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "غيث",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالعزيز",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "سفر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "بدر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سلطان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "جمال",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سلمان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "حمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالمحسن",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "مشعل",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "ناصر",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  }
]
    },
    {
      "name": "محمد",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": []
    },
    {
      "name": "علي",
      "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
      "children": [
  {
    "name": "فيحان",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "صالح",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "طايل",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "مرزوق",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "حاتم",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "موسى",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "البراء",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خيال",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "مرزوق",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "عبدالرحمن",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "مرزوق",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "حسين",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "مرزوق",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ناصر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "علي",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "حسين",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "فيحان",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "سعود",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "محمد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "عبدالله",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عبدالرحمن",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "خالد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "صالح",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عامر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "طارق",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "جاسر",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "عيد",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "محمد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "مشاري",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "سعد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      },
      {
        "name": "مطلق",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "عدي",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "مؤيد",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "فهد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": [
          {
            "name": "رياض",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          },
          {
            "name": "ريان",
            "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            "children": []
          }
        ]
      },
      {
        "name": "خالد",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  },
  {
    "name": "غازي",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": []
  },
  {
    "name": "بندر",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": []
  },
  {
    "name": "محمد",
    "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
    "children": [
      {
        "name": "ممدوح",
        "avatar": "file:///C:/Users/azozo/Desktop/شجرة%20العباريد/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
        "children": []
      }
    ]
  }
]
    }
  ]
};
        res.json(mockData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// مسار لحفظ التعديلات
app.post('/api/family', async (req, res) => {
    try {
        console.log('تم استقبال البيانات:', req.body);
        res.json({ success: true, message: "تم حفظ البيانات بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));