"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, BarChart, Settings, Code, Layers, Clock, CheckCircle, Lock, User, TrendingUp, Infinity } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { useTranslation } from '@/hooks/use-translation';

const StatItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 rounded-full p-4 mb-3 border border-primary/20">
            {icon}
        </div>
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold font-headline">{value}</p>
    </div>
)

export function Features() {
  const { t } = useTranslation();
  
  const stats = t('features.stats', { returnObjects: true }) as { icon: string, label: string, value: string }[];
  const features = t('features.list', { returnObjects: true }) as { icon: string, title: string, description: string, details: {label: string, value: string}[] }[];

  const icons: { [key: string]: React.ReactNode } = {
    Zap: <Zap className="w-8 h-8 text-primary" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-primary" />,
    BarChart: <BarChart className="w-8 h-8 text-primary" />,
    Settings: <Settings className="w-8 h-8 text-primary" />,
    Layers: <Layers className="w-8 h-8 text-primary" />,
    Code: <Code className="w-8 h-8 text-primary" />,
    Clock: <Clock className="w-8 h-8 text-primary" />,
    CheckCircle: <CheckCircle className="w-8 h-8 text-green-500" />,
    Lock: <Lock className="w-8 h-8 text-primary" />,
    User: <User className="w-8 h-8 text-primary" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-primary" />,
    Infinity: <Infinity className="w-8 h-8 text-primary" />
  };

  if (!stats || !features) return null;

  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
            {t('features.title')}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
            {t('features.description')}
          </p>
        </AnimatedSection>
        
        <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
            {stats.map((stat, index) => (
                <StatItem key={index} icon={icons[stat.icon]} label={stat.label} value={stat.value} />
            ))}
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card className="h-full flex flex-col text-left shadow-md hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit">
                    {icons[feature.icon]}
                  </div>
                  <CardTitle className="font-headline text-xl flex-1">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                    <p className="text-foreground/80 mb-6 flex-grow">{feature.description}</p>
                    <div className="space-y-2 text-sm">
                        {feature.details.map((detail, i) => (
                             <div key={i} className="flex justify-between items-center text-muted-foreground">
                                <span>{detail.label}</span>
                                <span className="font-mono text-foreground font-semibold">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
