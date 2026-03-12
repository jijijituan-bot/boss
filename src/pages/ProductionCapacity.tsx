import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChatDialog from '@/components/ChatDialog';

// Production capacity data
const productionData = [
  { name: '1月', value: 120 },
  { name: '2月', value: 110 },
  { name: '3月', value: 140 },
  { name: '4月', value: 160 },
  { name: '5月', value: 150 },
  { name: '6月', value: 180 },
  { name: '7月', value: 170 },
  { name: '8月', value: 190 },
  { name: '9月', value: 210 },
  { name: '10月', value: 200 },
  { name: '11月', value: 230 },
  { name: '12月', value: 240 },
];

// Production equipment
const productionEquipment = [
  {
    name: "CNC加工中心",
    quantity: 15,
    description: "高精度CNC加工中心，可完成复杂零件的精密加工",
    imagePrompt: "CNC machining center, industrial machine tool, factory environment"
  },
  {
    name: "数控车床",
    quantity: 20,
    description: "高性能数控车床，用于各类回转体零件的加工",
    imagePrompt: "CNC lathe machine, industrial turning equipment, metalworking"
  },
  {
    name: "精密磨床",
    quantity: 10,
    description: "高精度磨床，用于零件的精密磨削加工",
    imagePrompt: "Precision grinding machine, industrial equipment for metal finishing"
  },
  {
    name: "自动化装配线",
    quantity: 5,
    description: "自动化装配生产线，提高产品装配效率和一致性",
    imagePrompt: "Automatic assembly line, industrial robots working on production line"
  },
  {
    name: "三坐标测量仪",
    quantity: 3,
    description: "高精度三坐标测量仪，用于零件的精密检测",
    imagePrompt: "Coordinate measuring machine, precision measurement equipment in quality control lab"
  },
  {
    name: "激光切割机",
    quantity: 4,
    description: "高性能激光切割机，用于金属材料的精密切割",
    imagePrompt: "Laser cutting machine, industrial equipment cutting metal sheet with laser beam"
  }
];

// Production process steps
const productionProcess = [
  {
    step: 1,
    title: "需求分析",
    description: "深入了解客户需求，分析产品技术要求和生产工艺"
  },
  {
    step: 2,
    title: "方案设计",
    description: "根据客户需求，进行产品方案设计和工艺规划"
  },
  {
    step: 3,
    title: "零件加工",
    description: "采用先进加工设备，进行零件的精密加工"
  },
  {
    step: 4,
    title: "装配调试",
    description: "进行产品装配和调试，确保产品性能符合要求"
  },
  {
    step: 5,
    title: "质量检测",
    description: "严格的质量检测流程，确保产品质量稳定可靠"
  },
  {
    step: 6,
    title: "客户验收",
    description: "邀请客户进行产品验收，提供技术培训和售后服务"
  }
];

// Quality control system
const qualityControlSystem = [
  {
    title: "ISO9001质量管理体系",
    description: "公司已通过ISO9001质量管理体系认证，建立了完善的质量管理流程"
  },
  {
    title: "严格的质量控制流程",
    description: "从原材料采购到成品出厂，每个环节都有严格的质量控制措施"
  },
  {
    title: "先进的检测设备",
    description: "配备先进的检测设备，确保产品质量符合要求"
  },
  {
    title: "专业的质量团队",
    description: "拥有一支专业的质量控制团队，负责产品质量的全程监控"
  }
];

export default function ProductionCapacity() {
  const [visibleSections, setVisibleSections] = useState({
    overview: false,
    equipment: false,
    process: false,
    quality: false
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update visibility based on scroll position
      if (scrollPosition > 100) setVisibleSections(prev => ({ ...prev, overview: true }));
      if (scrollPosition > 600) setVisibleSections(prev => ({ ...prev, equipment: true }));
      if (scrollPosition > 1200) setVisibleSections(prev => ({ ...prev, process: true }));
      if (scrollPosition > 1800) setVisibleSections(prev => ({ ...prev, quality: true }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 rounded-l-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-index-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              生产能力
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              强大的<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">生产实力</span>
            </h1>
            <p className="text-xl text-gray-600">
              先进的生产设备和专业的技术团队，确保产品质量和交付能力
            </p>
          </div>
        </div>
      </section>

      {/* Production Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.overview ? "visible" : "hidden"}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                生产能力<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">概述</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                博视科技拥有现代化的生产基地和先进的生产设备，具备强大的生产能力和灵活的生产调度能力，能够满足客户的各类需求。
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">50000+</div>
                  <div className="text-gray-600">年产能(台)</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
                  <div className="text-gray-600">生产设备</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">15000㎡</div>
                  <div className="text-gray-600">生产面积</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">准时交付率</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                公司拥有一支经验丰富的生产团队，采用先进的生产管理系统，实现了生产过程的精细化管理和质量控制。我们能够根据客户需求，灵活调整生产计划，确保产品按时交付。
              </p>
              <p className="text-gray-600">
                通过持续的技术改造和设备更新，公司的生产能力和产品质量不断提升，为客户提供更加优质的产品和服务。
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.overview ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-900">月产能趋势图 (单位: 台)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Factory image */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
                {(() => {
                  const imagePrompt = encodeURIComponent("Modern factory interior with advanced machinery, high-tech manufacturing facility, clean and organized production area");
                  return (
                     <img 
                       src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/abc8e90c10dd2fb46b29d30bc66d963d_20250807142256.jpg" 
                       alt="汽车生产线" 
                       className="w-full h-auto"
                     />
                  );
                })()}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Production Equipment */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              生产设备
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              先进的<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">生产设备</span>
            </h2>
            <p className="text-gray-600">
              我们引进了一系列先进的生产和检测设备，为产品质量提供有力保障
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionEquipment.map((equipment, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={visibleSections.equipment ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
            <div className="h-48 bg-gray-100 flex items-center justify-center border-[8px] border-white shadow-xl">
              {(() => {
                const imageUrls = [
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/02fc636882dfee2e37484f2ecd91190e_20250807142513.jpg",
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/5073bf3a2ca8a3252488614b80a56d9b_20250807142543.jpg",
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/2965ab86f73db6a08aa5df1e4ac9e310_20250807142624.jpg",
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/90958bbe7049cbbe06655e249c3bba27_20250807142751.jpg",
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/0b347d7df3df114626c85c9bd025d0e8_20250807142935.jpg",
                  "https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/39c1a071bd785265bf9c0e8e777029c2_20250807143002.jpg"
                ];
                return (
                  <img 
                    src={imageUrls[index]} 
                    alt={equipment.name} 
                    className="w-full h-full object-contain p-1"
                  />
                );
              })()}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{equipment.name}</h3>
                    <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                      {equipment.quantity}台
                    </div>
                  </div>
                  <p className="text-gray-600">{equipment.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              生产流程
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              标准化<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">生产流程</span>
            </h2>
            <p className="text-gray-600">
              严格的生产流程管理，确保产品质量和生产效率
            </p>
          </div>
          
          <div className="relative">
            {/* Process timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            {/* Process steps */}
            <div className="space-y-16">
              {productionProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={visibleSections.process ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                        第{step.step}步
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="w-full md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              质量控制
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              严格的<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">质量控制体系</span>
            </h2>
            <p className="text-gray-600">
              我们建立了完善的质量控制体系，确保每一件产品都符合质量标准
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.quality ? "visible" : "hidden"}
            >
              <div className="space-y-6">
                {qualityControlSystem.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={visibleSections.quality ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                {(() => {
                  const imagePrompt = encodeURIComponent("Quality control laboratory with precision measuring instruments, quality inspector checking product specifications");
                   return (
                    <img 
                      src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/123_20250807144052.png" 
                      alt="质量检测实验室" 
                      className="w-full h-auto"
                    />
                  );
                })()}
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">质量承诺</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                    <span>严格遵守ISO9001质量管理体系标准</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                    <span>所有产品100%经过严格检测后方可出厂</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                    <span>建立完善的质量追溯系统，确保产品质量可追溯</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-blue-600 mt-1 mr-3"></i>
                    <span>持续改进产品质量和服务水平，满足客户需求</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  体验我们的专业生产能力
                </h2>
                <p className="text-blue-100 mb-8 text-lg">
                  无论您需要标准产品还是定制解决方案，我们都能满足您的需求
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                  >
                    联系我们
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </a>
                  <a
                    href="/products"
                    className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    查看产品
                  </a>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                {(() => {
                  const imagePrompt = encodeURIComponent("Business meeting between client and manufacturer discussing production requirements, professionals in modern office");
                   return (
                    <img 
                      src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276488310274/attachment/微信圖片_20250807143624_30_20250807143652.png" 
                      alt="商务洽谈" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatDialog
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}