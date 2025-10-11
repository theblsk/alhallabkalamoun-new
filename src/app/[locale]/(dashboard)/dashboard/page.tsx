import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('dashboard');

  return (
    <div className="min-h-screen bg-hlb-bg p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-hlb-primary mb-6">
          {t('title')}
        </h1>
        <p className="text-hlb-text">
          {t('welcome')}
        </p>
      </div>
    </div>
  );
}
