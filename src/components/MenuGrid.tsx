'use client';

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useLocale, useTranslations } from 'next-intl';
import { menuItems, MenuItem } from '@/mock/menu';

export default function MenuGrid() {
  const t = useTranslations('menu');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section id="menu" className="py-16 px-6 bg-hlb-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-bold text-hlb-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-hlb-text-light text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item: MenuItem) => (
            <Card key={item.id} className="bg-hlb-card-bg shadow-hlb rounded-xl overflow-hidden">
              <div className="relative">
                {/* Placeholder for image */}
                <div className="w-full h-48 bg-hlb-gold/20 flex items-center justify-center">
                  <span className="text-hlb-gold text-6xl">🥮</span>
                </div>
                
                {/* Availability tag */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      item.available
                        ? 'bg-hlb-available'
                        : 'bg-hlb-order-tomorrow'
                    }`}
                  >
                    {item.available ? t('availableToday') : t('orderTomorrow')}
                  </span>
                </div>
              </div>

              <CardBody className="p-6">
                <h3 className="text-xl font-bold text-hlb-primary mb-2">
                  {item.name}
                </h3>
                <p className="text-hlb-text-light text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {item.readyTime && (
                  <p className="text-hlb-text-light text-xs mb-3 italic">
                    {item.readyTime}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-hlb-gold">
                    ${item.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-hlb-primary text-white hover:bg-hlb-primary/90 font-semibold"
                  >
                    {t('addToOrder')}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
