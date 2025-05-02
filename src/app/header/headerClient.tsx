"use client";
import { useQueries } from "@tanstack/react-query";
import { fetchGenres } from "@/utils/fetchData";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

interface ApiResponse {
  genres: { data: Genre[] };
}

// Custom hook for window resize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default function HeaderClient({
  initialData,
}: {
  initialData: ApiResponse;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();

  const allGenres: Genre[] = initialData.genres.data;
  const isMobile = width < 640;

  // Determine number of visible genres based on screen width
  const getVisibleCount = () => {
    if (width >= 1024) return 8;
    if (width >= 768) return 6;
    if (width >= 640) return 5;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const initialVisible = allGenres.slice(0, visibleCount);
  const initialVisibleIds = new Set(initialVisible.map((g) => g.id));
  const initialMore = allGenres.filter((g) => !initialVisibleIds.has(g.id));

  const [visibleGenres, setVisibleGenres] = useState<Genre[]>(initialVisible);
  const [moreGenres, setMoreGenres] = useState<Genre[]>(initialMore);

  // Update visible genres when window size changes
  useEffect(() => {
    const newVisibleCount = getVisibleCount();
    const newVisible = allGenres.slice(0, newVisibleCount);
    const newVisibleIds = new Set(newVisible.map((g) => g.id));
    const newMore = allGenres.filter((g) => !newVisibleIds.has(g.id));

    setVisibleGenres(newVisible);
    setMoreGenres(newMore);
  }, [width, allGenres]);

  const [genresQuery] = useQueries({
    queries: [
      {
        queryKey: ["genres"],
        queryFn: fetchGenres,
        staleTime: 5 * 60 * 1000,
        initialData: initialData.genres,
      },
    ],
  });

  const isLoading: boolean = genresQuery.isLoading;
  const isError: boolean = genresQuery.isError;

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-20">Error loading data.</div>
    );
  }
  const isVideoPage = pathname.includes("/videos/");
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleGenreClick = (genre: Genre) => {
    const updatedMoreGenres = moreGenres.filter((g) => g.id !== genre.id);
    const updatedVisibleGenres = [...visibleGenres, genre];
    let finalVisibleGenres = updatedVisibleGenres;
    let newMoreGenres = updatedMoreGenres;

    if (updatedVisibleGenres.length > 6) {
      const [removed, ...rest] = updatedVisibleGenres;
      finalVisibleGenres = rest;
      newMoreGenres = [...updatedMoreGenres, removed];
    }
    setVisibleGenres(finalVisibleGenres);
    setMoreGenres(newMoreGenres);
    setIsDropdownOpen(false);
    router.push(`/genres/${genre.id}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`pt-4 pb-5 fixed top-0 z-50 w-full header transition-all ease-in-out backdrop-saturate-[180%] backdrop-blur-[5px] 
      ${isVideoPage ? "bg-[rgba(0,0,0,0.1)]" : "bg-[rgba(255,255,255,0.8)]"}`}
    >
      <div className="w-full max-w-[1332px] mx-auto px-4 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-5">
          <Link href="/">
            <figure className="w-5 h-5">
              <svg
                className="size-full"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0674 8.88856L10.5067 16.6663M14.0674 8.88856L18.8893 8.91449M14.0674 8.88856L11.3018 3.33303M14.0674 8.88856L2.41206 8.91449M15.4874 3.71781C14.731 3.09122 6.17398 3.33222 5.51211 3.71781C4.8266 4.12751 2.1082 8.53777 2.22639 8.99566C2.53369 10.2489 9.27059 16.563 10.4998 16.563C11.6344 16.563 18.3713 10.3693 18.7732 8.99566C18.915 8.48957 16.2675 4.36851 15.4874 3.71781Z"
                  stroke={isVideoPage ? "#ffffff" : "#8C8C8C"}
                  strokeOpacity={isVideoPage ? 0.52 : 1}
                />
              </svg>
            </figure>
          </Link>
          <div>
            <ul className="flex items-center gap-4 max-sm:hidden">
              {visibleGenres.map((genre) => {
                const isActive = pathname === `/genres/${genre.id}`;
                return (
                  <li key={genre.id}>
                    <Link
                      href={`/genres/${genre.id}`}
                      className={`text-sm font-normal leading-[100%] tracking-[0.14px] transition-all duration-200 ease-in-out delay-200 ${
                        isVideoPage
                          ? "text-white/50 hover:text-white"
                          : isActive
                          ? "text-black hover:text-black"
                          : "text-[rgba(0,0,0,0.43)]"
                      }`}
                    >
                      {genre.name}
                    </Link>
                  </li>
                );
              })}
              {moreGenres.length > 0 && (
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`text-sm font-normal leading-[100%] tracking-[0.14px] transition-all duration-200 ease-in-out delay-200 ${
                      isVideoPage
                        ? "text-white/50 hover:text-white"
                        : "text-[rgba(0,0,0,0.43)]"
                    }`}
                  >
                    More
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-[200px] z-20">
                      {moreGenres.map((genre) => {
                        const isActive = pathname === `/genres/${genre.id}`;
                        return (
                          <li key={genre.id}>
                            <button
                              onClick={() => handleGenreClick(genre)}
                              className={`block w-full text-left px-4 py-2 text-sm font-normal leading-[100%] tracking-[0.14px] transition-all duration-200 ease-in-out delay-200 ${
                                isActive
                                  ? "text-black hover:text-black"
                                  : "text-[rgba(0,0,0,0.43)] hover:text-black"
                              }`}
                            >
                              {genre.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <figure className="w-[18px] h-[18px]">
              <svg
                className="size-full"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 16L12.0949 12.0949M12.0949 12.0949C13.0789 11.1109 13.6875 9.7515 13.6875 8.25C13.6875 5.24695 11.2531 2.8125 8.25 2.8125C5.24695 2.8125 2.8125 5.24695 2.8125 8.25C2.8125 11.2531 5.24695 13.6875 8.25 13.6875C9.7515 13.6875 11.1109 13.0789 12.0949 12.0949Z"
                  stroke={isVideoPage ? "#ffffff" : "#8C8C8C"}
                  strokeOpacity={isVideoPage ? 0.52 : 1}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </figure>
          </Link>
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="p-0"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={isVideoPage ? "#ffffff" : "#8C8C8C"}
                strokeOpacity={isVideoPage ? 0.52 : 1}
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
      <div
        className={`fixed inset-0 top-[60px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-10 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-screen backdrop-saturate-[180%] backdrop-blur-[5px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-[120%] opacity-0"
          } ${
            isVideoPage
              ? "bg-black/70 backdrop-blur-xl "
              : "bg-[rgba(255,255,255,0.8)]"
          }`}
        >
          <ul className="flex flex-col">
            {allGenres.map((genre, index) => {
              const isActive = pathname === `/genres/${genre.id}`;
              return (
                <li
                  key={genre.id}
                  className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-8 pointer-events-none"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 30}ms`
                      : `${(allGenres.length - index - 1) * 20}ms`,
                  }}
                >
                  <Link
                    href={`/genres/${genre.id}`}
                    className={`block px-4 py-3 text-sm font-normal leading-[100%] tracking-[0.14px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isVideoPage
                        ? "text-white/50 hover:text-white"
                        : isActive
                        ? "text-black hover:text-black"
                        : "text-[rgba(0,0,0,0.43)] hover:text-black"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {genre.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
