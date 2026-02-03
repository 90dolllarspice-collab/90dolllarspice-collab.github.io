
import React, { useEffect, useRef, useState } from 'react';
import './GraphSection.css';

interface DataPoint {
  id: number;
  title: string;
  description: string;
  legalNote: string;
  phase: 'incompetence' | 'deception' | 'coercion' | 'fraud';
}

const dataPoints: DataPoint[] = [
  {
    id: 1,
    title: "Poor business practices and mismanagement",
    description: "Repeated missed deadlines, vague delivery estimates, and shifting explanations for delays. While not illegal by themselves, these practices create foreseeable harm and set the stage for escalation. Chronic nonperformance without transparency is the baseline failure visible throughout the correspondence.",
    legalNote: "Negligent business conduct",
    phase: 'incompetence'
  },
  {
    id: 2,
    title: "Failure to provide clear, consistent terms",
    description: "Pricing structures, timelines, and conditions change midstream without clear written agreement. Customers are left uncertain about what they actually agreed to versus what is later demanded. This moves beyond incompetence into deceptive conduct territory.",
    legalNote: "Breach of good faith and fair dealing",
    phase: 'incompetence'
  },
  {
    id: 3,
    title: "After-the-fact justification of charges",
    description: "Internal memos and retroactive documentation are created to rationalize added costs, canceled discounts, or expedited fees that were not part of the original agreement. This suggests intentional reconstruction of the record rather than contemporaneous consent.",
    legalNote: "False documentation practices",
    phase: 'incompetence'
  },
  {
    id: 4,
    title: "Holding customer property as leverage",
    description: "Customer-owned property is retained while new conditions or payments are imposed. Continued possession is used to pressure compliance rather than resolve the dispute. This crosses from unethical into legally risky conduct depending on jurisdiction.",
    legalNote: "Potential conversion or unlawful detention",
    phase: 'deception'
  },
  {
    id: 5,
    title: "Unilateral modification of agreements",
    description: "Discounts are revoked, fees added, or work scope altered without customer authorization. These changes are presented as faits accomplis rather than negotiated amendments. This constitutes deceptive trade behavior in many regulatory frameworks.",
    legalNote: "Violates Utah Consumer Sales Practices Act",
    phase: 'deception'
  },
  {
    id: 6,
    title: "Misrepresentation of dispute status",
    description: "Statements are made implying disputes are \"resolved,\" \"final,\" or already adjudicated when no judgment or final determination exists. This is designed to create false inevitability and suppress customer resistance.",
    legalNote: "Fraudulent misrepresentation",
    phase: 'deception'
  },
  {
    id: 7,
    title: "Use of false or misleading authority signals",
    description: "Communications are sent under the banner of a \"legal department\" or purported legal agent without clear disclosure of licensing or authority. When questioned directly, clarification is avoided. This is a classic intimidation tactic and potentially unlawful.",
    legalNote: "Unauthorized practice of law (UPL)",
    phase: 'deception'
  },
  {
    id: 8,
    title: "Harassment after objection or dispute",
    description: "Once a customer pushes back, communications escalate in frequency, tone, and threat level rather than de-escalating. Continued contact after explicit requests to stop moves this into harassment territory.",
    legalNote: "Violates FDCPA and harassment statutes",
    phase: 'coercion'
  },
  {
    id: 9,
    title: "Retaliatory financial escalation",
    description: "Additional charges, expedited fees, or threats of increased liability appear only after disputes or chargebacks are initiated. This strongly suggests retaliation rather than legitimate cost recovery.",
    legalNote: "Retaliatory business practices",
    phase: 'coercion'
  },
  {
    id: 10,
    title: "Misrepresentation to third parties",
    description: "Statements to courts or financial institutions characterize provisional or pending outcomes as definitive wins. This misleads decision-makers and strengthens coercive leverage against the customer.",
    legalNote: "Fraud upon the court or financial institutions",
    phase: 'coercion'
  },
  {
    id: 11,
    title: "Abuse of legal process or threat thereof",
    description: "Litigation is invoked primarily as a pressure tool rather than a good-faith dispute resolution mechanism. Threats are framed to induce fear rather than to outline lawful remedies. This is a serious ethical and legal breach.",
    legalNote: "Abuse of process / Vexatious litigation",
    phase: 'fraud'
  },
  {
    id: 12,
    title: "Systematic intimidation and coercion",
    description: "Taken as a whole, the conduct reflects a repeatable pattern: delay, confuse, retain property, escalate costs, invoke dubious authority, and threaten consequences until payment is forced. At this level, the behavior functions less like a business dispute and more like coercive extraction.",
    legalNote: "Pattern of racketeering / Extortion",
    phase: 'fraud'
  }
];

const phaseConfig = {
  incompetence: {
    label: 'PHASE I: INCOMPETENCE',
    color: '#1b74e4',
    bgColor: '#f8f9fa',
    description: 'Poor practices that create the foundation for abuse'
  },
  deception: {
    label: 'PHASE II: DECEPTION',
    color: '#ff8c00',
    bgColor: '#fff8f0',
    description: 'Deliberate misrepresentation and manipulation'
  },
  coercion: {
    label: 'PHASE III: COERCION',
    color: '#e63946',
    bgColor: '#fff5f5',
    description: 'Threats, retaliation, and systematic pressure'
  },
  fraud: {
    label: 'PHASE IV: SYSTEMATIC FRAUD',
    color: '#a4161a',
    bgColor: '#1a0000',
    description: 'Criminal conduct territory'
  }
};

const GraphSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();
      const graphHeight = graphRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollTop = -rect.top;
      const scrollableHeight = graphHeight - viewportHeight;
      
      if (scrollTop < 0) {
        setScrollProgress(0);
      } else if (scrollTop > scrollableHeight) {
        setScrollProgress(1);
      } else {
        setScrollProgress(scrollTop / scrollableHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const marginLeft = 80;
    const marginRight = 40;
    const marginTop = 40;
    const marginBottom = 60;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = marginTop + ((height - marginTop - marginBottom) / 5) * i;
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(width - marginRight, y);
      ctx.stroke();
    }

    for (let i = 0; i <= 6; i++) {
      const x = marginLeft + ((width - marginLeft - marginRight) / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, marginTop);
      ctx.lineTo(x, height - marginBottom);
      ctx.stroke();
    }

    const numPoints = dataPoints.length;
    const points: { x: number; y: number; phase: string }[] = [];
    
    const startX = marginLeft;
    const endX = width - marginRight;
    const startY = height - marginBottom;
    const endY = marginTop;

    for (let i = 0; i < numPoints; i++) {
      const progress = i / (numPoints - 1);
      const x = startX + (endX - startX) * progress;
      
      const baseY = startY - (startY - endY) * Math.pow(progress, 1.8);
      
      const variation = Math.sin(i * 0.7) * 12;
      const y = baseY + variation;
      
      points.push({ x, y, phase: dataPoints[i].phase });
    }

    const visiblePoints = Math.ceil(scrollProgress * numPoints);
    
    if (visiblePoints > 1) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 25;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < visiblePoints && i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        
        const phaseColors = {
          incompetence: '#1b74e4',
          deception: '#ff8c00',
          coercion: '#e63946',
          fraud: '#a4161a'
        };
        
        ctx.strokeStyle = phaseColors[currentPoint.phase as keyof typeof phaseColors];
        
        const cpX = (prevPoint.x + currentPoint.x) / 2;
        const cpY = (prevPoint.y + currentPoint.y) / 2;
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, cpY);
        ctx.stroke();
      }
      
      if (visiblePoints < points.length) {
        const lastFullPoint = points[visiblePoints - 1];
        const nextPoint = points[visiblePoints];
        const partialProgress = (scrollProgress * numPoints) - (visiblePoints - 1);
        
        const partialX = lastFullPoint.x + (nextPoint.x - lastFullPoint.x) * partialProgress;
        const partialY = lastFullPoint.y + (nextPoint.y - lastFullPoint.y) * partialProgress;
        
        const phaseColors = {
          incompetence: '#1b74e4',
          deception: '#ff8c00',
          coercion: '#e63946',
          fraud: '#a4161a'
        };
        
        ctx.strokeStyle = phaseColors[nextPoint.phase as keyof typeof phaseColors];
        ctx.beginPath();
        ctx.moveTo(lastFullPoint.x, lastFullPoint.y);
        ctx.lineTo(partialX, partialY);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      for (let i = 0; i < visiblePoints && i < points.length; i++) {
        const point = points[i];
        const isLatest = i === visiblePoints - 1;
        
        const phaseColors = {
          incompetence: '#1b74e4',
          deception: '#ff8c00',
          coercion: '#e63946',
          fraud: '#a4161a'
        };
        
        const pointColor = phaseColors[point.phase as keyof typeof phaseColors];
        
        if (isLatest) {
          ctx.shadowColor = pointColor;
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, isLatest ? 12 : 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, isLatest ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        
        if (isLatest) {
          ctx.strokeStyle = pointColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 16, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    ctx.shadowBlur = 0;

    ctx.save();
    ctx.translate(25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#333';
    ctx.font = '700 13px system-ui';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.15em';
    ctx.fillText('SEVERITY', 0, 0);
    ctx.restore();

    ctx.fillStyle = '#333';
    ctx.font = '700 13px system-ui';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.15em';
    ctx.fillText('PROGRESSION', width / 2, height - 20);

  }, [scrollProgress]);

  const getPointOpacity = (index: number): number => {
    const pointProgress = index / (dataPoints.length - 1);
    if (scrollProgress >= pointProgress) {
      return 1;
    } else if (scrollProgress >= pointProgress - 0.05) {
      return (scrollProgress - (pointProgress - 0.05)) / 0.05;
    }
    return 0;
  };

  const getCurrentPhase = (): string => {
    const currentIndex = Math.floor(scrollProgress * dataPoints.length);
    if (currentIndex >= dataPoints.length) return dataPoints[dataPoints.length - 1].phase;
    return dataPoints[currentIndex]?.phase || 'incompetence';
  };

  const currentPhase = getCurrentPhase();
  const phaseInfo = phaseConfig[currentPhase as keyof typeof phaseConfig];

  let prevPhase: string | null = null;

  return (
    <section 
      className={`graph-section graph-section--${currentPhase}`} 
      id="graph" 
      ref={graphRef}
      style={{
        backgroundColor: phaseInfo.bgColor,
        transition: 'background-color 1s ease'
      }}
    >
      <div className="graph-container">
        <div className="graph-header">
          <h2 className="graph-title">The Escalation Pattern</h2>
          <p className="graph-subtitle">
            A documented progression from poor business practices to systematic coercion
          </p>
        </div>

        <div className="graph-canvas-wrapper">
          <canvas ref={canvasRef} className="graph-canvas"></canvas>
          <div className="graph-phase-indicator" style={{ color: phaseInfo.color }}>
            <div className="graph-phase-label">{phaseInfo.label}</div>
            <div className="graph-phase-description">{phaseInfo.description}</div>
          </div>
        </div>

        <div className="graph-points">
          {dataPoints.map((point, index) => {
            const showPhaseBreak = prevPhase !== null && prevPhase !== point.phase;
            const phaseBreakInfo = showPhaseBreak ? phaseConfig[point.phase] : null;
            const currentPrevPhase = prevPhase;
            prevPhase = point.phase;

            return (
              <React.Fragment key={point.id}>
                {showPhaseBreak && phaseBreakInfo && (
                  <div 
                    className={`phase-break phase-break--${point.phase}`}
                    style={{
                      opacity: getPointOpacity(index),
                      transform: `translateY(${(1 - getPointOpacity(index)) * 30}px)`,
                    }}
                  >
                    <div className="phase-break-line" style={{ backgroundColor: phaseBreakInfo.color }}></div>
                    <div className="phase-break-content">
                      <h3 className="phase-break-title" style={{ color: phaseBreakInfo.color }}>
                        {phaseBreakInfo.label}
                      </h3>
                      <p className="phase-break-description">{phaseBreakInfo.description}</p>
                    </div>
                    <div className="phase-break-line" style={{ backgroundColor: phaseBreakInfo.color }}></div>
                  </div>
                )}
                
                <div
                  className={`graph-point graph-point--${point.phase}`}
                  style={{
                    opacity: getPointOpacity(index),
                    transform: `translateY(${(1 - getPointOpacity(index)) * 20}px)`,
                    borderLeftColor: phaseConfig[point.phase].color
                  }}
                >
                  <div className="graph-point-content">
                    <h3 className="graph-point-title">{point.title}</h3>
                    <p className="graph-point-description">{point.description}</p>
                    <div className="graph-point-legal" style={{ color: phaseConfig[point.phase].color }}>
                      <span className="graph-point-legal-icon">⚖</span>
                      {point.legalNote}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GraphSection;
