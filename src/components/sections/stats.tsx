"use client";

import { Users, FolderGit2, Cpu, Smile } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';

export function Stats() {
  const { t } = useTranslation();
  const statsData = t('stats.items', { returnObjects: true }) as { icon: string, value: number, label: string, isFloat?: boolean }[];

  const icons: { [key: string]: React.ReactNode } = {
    Users: <Users className="h-10 w-10 text-primary" />,
    FolderGit2: <FolderGit2 className="h-10 w-10 text-primary" />,
    Cpu: <Cpu className="h-10 w-10 text-primary" />,
    Smile: <Smile className="h-10 w-10 text-primary" />,
  };
  
  if(!statsData) return null;

  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
            <Card className="shadow-2xl">
                <CardContent className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {statsData.map((stat, index) => (
                            <div key={index} className="text-center">
                                {icons[stat.icon]}
                                <div className="font-headline text-5xl font-bold my-3">
                                    <AnimatedCounter endValue={stat.value} isFloat={stat.isFloat} />
                                    {stat.label.includes('%') && '%'}
                                </div>
                                <p className="text-foreground/70">{stat.label.replace(' (%)', '')}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </AnimatedSection>
      </div>
    </section>
  )
}
