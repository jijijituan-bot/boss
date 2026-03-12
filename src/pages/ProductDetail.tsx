import { useState, useEffect } from 'react';
import FeedbackDialog from '@/components/FeedbackDialog';
import ChatDialog from '@/components/ChatDialog';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Product data (should be imported from a shared data file in a real project)
const products = [
  {
    id: 1,
    name: "全自动装配生产线",
    categoryId: 1,
    categoryName: "非标定制自动化设备",
    description: "针对电子产品的全自动装配生产线，可完成零件上料、组装、检测、包装等一系列工序，自动化程度高，生产效率显著提升。",
    features: [
      "自动化程度高，减少人工干预",
      "高精度定位系统，确保装配质量",
      "模块化设计，易于维护和升级",
      "智能控制系统，可实现远程监控"
    ],
    application: "电子、汽车零部件、医疗器械等行业的产品装配",
    technicalParameters: [
      { name: "电源电压", value: "AC 220V ±10%, 50Hz" },
      { name: "工作环境温度", value: "0-40℃" },
      { name: "工作环境湿度", value: "30-85% RH (无凝结)" },
      { name: "气源压力", value: "0.5-0.7MPa" },
      { name: "生产效率", value: "最高可达120件/分钟" },
      { name: "设备尺寸", value: "8000×1500×1800mm (可定制)" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/284ffbd75a4946a14d1122128337ff8a_20250807141306.jpg",
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/f1fe33911b6aa70e761b0665479deb09_20250807135518.jpg"
    ]
  },
  {
    id: 2,
    name: "机器人焊接工作站",
    categoryId: 1,
    categoryName: "非标定制自动化设备",
    description: "集成工业机器人的焊接工作站，可完成复杂工件的高精度焊接作业，保证焊接质量稳定，提高生产效率。",
    features: [
      "高精度焊接机器人，确保焊接质量",
      "多工位设计，提高设备利用率",
      "智能焊接参数调节，适应不同工件",
      "完善的安全防护系统"
    ],
    application: "汽车制造、工程机械、金属加工等行业的焊接作业",
    technicalParameters: [
      { name: "电源电压", value: "AC 380V ±10%, 50Hz" },
      { name: "工作环境温度", value: "0-45℃" },
      { name: "工作半径", value: "1400-2000mm (可选)" },
      { name: "重复定位精度", value: "±0.05mm" },
      { name: "焊接电流", value: "50-500A" },
      { name: "设备尺寸", value: "5000×4000×3000mm (可定制)" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/1acef5b9d280393e81bf82503b44fcaa_20250807141320.jpg",
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/d9aa07d278fed70fee86afae2da4f2ba_20250807135525.jpg"
    ]
  },
  {
    id: 3,
    name: "精密线性模组",
    categoryId: 2,
    categoryName: "自动化模组加工及组装",
    description: "高精度线性模组，采用优质材料和精密加工工艺制造，具有运行平稳、定位精准等特点，可广泛应用于各类自动化设备。",
    features: [
      "高精度滚珠丝杠传动，定位精度高",
      "高强度铝合金型材，结构稳定",
      "多种驱动方式可选",
      "可根据需求定制行程和负载"
    ],
    application: "自动化设备、精密仪器、电子制造等领域的直线运动系统",
    technicalParameters: [
      { name: "定位精度", value: "±0.01mm" },
      { name: "重复定位精度", value: "±0.005mm" },
      { name: "最大速度", value: "1000mm/s" },
      { name: "有效行程", value: "50-2000mm (可定制)" },
      { name: "最大负载", value: "50-500kg" },
      { name: "驱动方式", value: "伺服电机/步进电机" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/b858e50d6548aaf458ba72ca247437e7_20250807140409.jpg"
    ]
  },
  {
    id: 4,
    name: "视觉检测设备",
    categoryId: 3,
    categoryName: "检测设备",
    description: "基于机器视觉技术的高精度检测设备，可对产品外观、尺寸、缺陷等进行快速准确检测，替代人工检测，提高检测效率和准确性。",
    features: [
      "高分辨率工业相机，图像采集清晰",
      "先进的图像处理算法，检测精度高",
      "自动化上下料系统，实现无人化检测",
      "完善的数据分析和报表功能"
    ],
    application: "电子、半导体、精密制造等行业的产品质量检测",
    technicalParameters: [
      { name: "检测精度", value: "±0.001mm" },
      { name: "检测速度", value: "最高可达300件/分钟" },
      { name: "相机分辨率", value: "500万-2000万像素" },
      { name: "光源类型", value: "LED环形光源/条形光源" },
      { name: "电源电压", value: "AC 220V ±10%, 50Hz" },
      { name: "设备尺寸", value: "1500×1200×1800mm" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/300151ce25368165bce468164eedae75_20250807135540.jpg"
    ]
  },
  {
    id: 5,
    name: "激光测量仪",
    categoryId: 3,
    categoryName: "检测设备",
    description: "采用激光技术的高精度测量仪器，可对各类工件的尺寸、形状、位置等参数进行非接触式测量，测量精度高，速度快。",
    features: [
      "非接触式测量，避免对工件造成损伤",
      "高精度激光传感器，测量精度可达微米级",
      "自动化测量流程，提高检测效率",
      "数据自动分析和存储功能"
    ],
    application: "精密制造、模具加工、汽车零部件等行业的精密测量",
    technicalParameters: [
      { name: "测量范围", value: "0-1000mm" },
      { name: "测量精度", value: "±0.5μm" },
      { name: "分辨率", value: "0.1μm" },
      { name: "测量速度", value: "1000点/秒" },
      { name: "数据接口", value: "USB/RS232/Ethernet" },
      { name: "电源电压", value: "DC 24V" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/07c02384a7612a765351955ffd4013be_20250807140455.jpg"
    ]
  },
  {
    id: 6,
    name: "精密五金冲压件",
    categoryId: 4,
    categoryName: "精密金属件加工",
    description: "采用高精度冲压设备和优质材料制造的精密五金件，具有尺寸精度高、表面质量好等特点，可满足各类精密设备的装配需求。",
    features: [
      "高精度冲压模具，确保产品尺寸一致性",
      "优质原材料，保证产品强度和耐用性",
      "严格的质量控制，确保产品质量",
      "可根据客户图纸定制生产"
    ],
    application: "电子设备、精密仪器、汽车零部件等产品的结构件",
    technicalParameters: [
      { name: "材料厚度", value: "0.1-3.0mm" },
      { name: "尺寸精度", value: "±0.01mm" },
      { name: "表面粗糙度", value: "Ra0.8-Ra3.2" },
      { name: "材料种类", value: "不锈钢、铝合金、铜合金、碳钢等" },
      { name: "最大加工尺寸", value: "500×500mm" },
      { name: "最小孔径", value: "0.5mm" }
    ],
    imageUrls: [
      "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/81ec193cb1a0ee1a80392250e7efa2d0_20250807140351.jpg"
    ]
  }
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [visibleSection, setVisibleSection] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTechnicalSupportOpen, setIsTechnicalSupportOpen] = useState(false);

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === parseInt(id || "0"));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Redirect to products page if product not found
      navigate('/products');
    }
    
    setLoading(false);
    
    // Handle scroll animation
    const handleScroll = () => {
      setVisibleSection(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">加载产品详情中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // Will be redirected by navigate
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb navigation */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">首页</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <Link to="/products" className="hover:text-blue-600">产品中心</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <Link to={`/products?category=${product.categoryId}`} className="hover:text-blue-600">
              {product.categoryName}
            </Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <span className="text-blue-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Product images */}
              <div>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <img 
                    src={product.imageUrls[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Thumbnail images */}
                {product.imageUrls.length > 1 && (
                  <div className="flex gap-4">
                    {product.imageUrls.map((url: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          activeImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={url} 
                          alt={`${product.name} - 图片 ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product information */}
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                  {product.categoryName}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{product.name}</h1>
                
                <div className="prose prose-lg text-gray-600 max-w-none mb-8">
                  <p>{product.description}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">产品特点</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">应用领域</h3>
                  <p className="text-gray-600">{product.application}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                   <button 
                     onClick={() => setIsDialogOpen(true)}
                     className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                    索取报价
                    <i className="fa-solid fa-file-invoice-dollar ml-2"></i>
                  </button>
                   <button 
                     className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                     onClick={() => setIsTechnicalSupportOpen(true)}>
                    技术咨询
                    <i className="fa-solid fa-comments ml-2"></i>
                  </button>
                  <Link
                    to="/products"
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    返回列表
                    <i className="fa-solid fa-arrow-left ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical parameters section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                技术参数
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                产品技术参数
              </h2>
              <p className="text-gray-600">
                以下为该产品的详细技术参数，如有特殊需求，可联系我们进行定制
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-8 py-6 text-left text-gray-700 font-semibold">参数名称</th>
                      <th className="px-8 py-6 text-left text-gray-700 font-semibold">参数值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.technicalParameters.map((param: { name: string, value: string }, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-8 py-6 text-gray-900">{param.name}</td>
                        <td className="px-8 py-6 text-gray-600">{param.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-6 bg-gray-50 border-t">
                <p className="text-gray-600 text-sm">
                  注：以上为标准技术参数，具体产品参数可能因型号不同而有所差异，如有特殊需求，可联系我们进行定制。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related products section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                相关产品
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                您可能也感兴趣的产品
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct: any) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/products/${relatedProduct.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <img 
                        src={relatedProduct.imageUrls[0]} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{relatedProduct.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{relatedProduct.description}</p>
                      <div className="text-blue-600 font-medium flex items-center">
                        查看详情
                        <i className="fa-solid fa-arrow-right ml-2"></i>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSection ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">对该产品感兴趣？</h2>
                  <p className="text-blue-100 mb-8 text-lg">
                    填写下方表单，获取详细产品资料和专属报价
                  </p>
                   <div className="flex flex-wrap gap-4">
                    <button 
                      className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                      onClick={() => setIsTechnicalSupportOpen(true)}
                    >
                      在线咨询
                      <i className="fa-solid fa-comments ml-2"></i>
                    </button>
                     <button 
                       className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
                       onClick={() => setIsDialogOpen(true)}>
                      索取资料
                    </button>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto hidden lg:block">
                  <img 
                    src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/博视办公室照片_20250807140836.jpg" 
                    alt="咨询我们" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
     </div>
       <FeedbackDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <ChatDialog
        isOpen={isTechnicalSupportOpen}
        onClose={() => setIsTechnicalSupportOpen(false)}
      />
      </section>
    </div>
  );
}