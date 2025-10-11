'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { Link } from "@heroui/react";

export default function PublicNavbar() {
  const t = useTranslations('navbar');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const locale = useLocale(); // 'en' | 'ar'
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageSwitch() {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    // Replace current route with the same path under the other locale
    router.replace(pathname, { locale: nextLocale });
  }

  const menuItems = [
    { key: 'home', label: t('home'), href: '#home' },
    { key: 'menu', label: t('menu'), href: '#menu' },
    { key: 'about', label: t('about'), href: '#about' },
    { key: 'contact', label: t('contact'), href: '#contact' },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-hlb-primary text-white"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold">{t('title')}</h1>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.key}>
            <Link
              href={item.href}
              className="text-white hover:text-hlb-gold transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            variant="light"
            size="sm"
            onPress={handleLanguageSwitch}
            className="text-white hover:text-hlb-gold min-w-0 px-2"
          >
            <Globe color="white" size={20} />
          </Button>
        </NavbarItem>
        
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="bg-hlb-primary">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            <Link
              href={item.href}
              className="w-full text-white hover:text-hlb-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
