'use client';

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useLocale, useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section id="home" className="py-16 px-6 bg-hlb-bg">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left side - Text content */}
          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-hlb-text text-lg mb-4">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-hlb-primary mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-hlb-text-light text-lg mb-8 leading-relaxed">
              {t('description')}
            </p>
            <Button
              size="lg"
              className="bg-hlb-primary text-white hover:bg-hlb-primary/90 font-semibold px-8 py-3"
            >
              {t('cta')}
            </Button>
          </div>

          {/* Right side - Images */}
          <div className="flex-1 flex flex-col items-center">
            {/* Baklava images */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative w-32 h-32 bg-hlb-gold/20 rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-hlb-gold/40 rounded-lg flex items-center justify-center">
                  <span className="text-hlb-gold text-2xl">🥮</span>
                </div>
              </div>
              <div className="relative w-32 h-32 bg-hlb-gold/20 rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-hlb-gold/40 rounded-lg flex items-center justify-center">
                  <span className="text-hlb-gold text-2xl">🥮</span>
                </div>
              </div>
            </div>

            {/* Since 1881 card */}
            <Card className="bg-white border-2 border-hlb-primary max-w-xs">
              <CardBody className="text-center py-4">
                <h3 className="text-hlb-primary font-bold text-lg">
                  {t('since')}
                </h3>
                <p className="text-hlb-text-light text-sm">
                  {t('traditional')}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
