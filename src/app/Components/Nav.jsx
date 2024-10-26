"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Image from "next/image";
import { getUserData } from "../db/main";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  const { isLoged, setIsLoged, setUserId, userId } = useContext(UserContext);
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: true },
  ]);

  useEffect(() => {
    setNavigation([
      { name: "Home", href: "/", current: true },
      ...(isLoged ? [{ name: "Wardrobe", href: "/Wardrobe", current: false }] : []),
    ]);
  }, [isLoged]); // Update navigation items based on isLoged

  const [view, setview] = useState(false);
  const handleClick = (clickedItem) => {
    setNavigation((prev) =>
      prev.map((item) => ({
        ...item,
        current: item.name === clickedItem.name,
      }))
    );
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setIsLoged(false);
    setUserId(null);
    localStorage.setItem("isLoged", JSON.stringify(false));
    localStorage.setItem("userId", JSON.stringify(null));
  };
  const handleView = () => setview((prev) => !prev);
  
  const [username, setUsername] = useState("");
  const handleGetUserData = async (id) => {
    if (id !== null) {
      try {
        const response = await getUserData(id);
        if (response.success) {
          setUsername(response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }

 
  useEffect(() => {
    handleGetUserData(userId);
  }, [userId]);
  
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-my_light text-my_red pt-4">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {isLoged && (
              <div className="relative">
                <Image
                  onClick={handleView}
                  src="/svgs/account.svg"
                  alt="Logout"
                  width={30}
                  height={30}
                  className="cursor-pointer sm:hidden block z-20 "
                />
                <div className={`${view ? 'flex' : 'hidden'} my_transition shadow-xl uppercase absolute -left-[calc(100%)] top-[calc(100%+20px)] w-fit  min-w-[120px] bg-my_dark  flex-col gap-2 items-center justify-center rounded-xl`}>
                  <div className="px-4 py-2 text-my_light font-bold">hi {username} ! </div>
                  <div className="px-4 py-2 text-my_light font-bold" onClick={handleLogOut}>Log out</div>
                </div>
              </div>
            )}
            <DisclosureButton
              className="group relative inline-flex items-center justify-center p-2 text-my_red focus:outline-none"
              aria-label="Open main menu"
            >
              <Bars3Icon aria-hidden="true" className="block h-8 w-8 group-data-[open]:hidden" />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-8 w-8 group-data-[open]:block border-2 border-my_dark text-my_red"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start px-5 sm:px-0">
            <h1 className="text-xl font-bold text-my_red uppercase md:text-4xl">
              Eleanor.
            </h1>
            <div className="hidden ml-auto sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleClick(item)}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current ? "font-bold underline underline-offset-8" : "",
                      "block px-3 py-2 text-2xl font-bold text-my_red"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoged ? (
                  <div className="relative flex items-center justify-center">
                    <Image
                      src="/svgs/account.svg"
                      onClick={handleView}
                      alt="Logout"
                      width={30}
                      height={30}
                      className="cursor-pointer"
                    />
                    <div className={`${view ? 'flex' : 'hidden'} my_transition shadow-xl absolute right-full top-[calc(100%+10px)] w-fit  min-w-[120px] bg-my_dark flex-col gap-2 items-center justify-center rounded-xl`}>
                      <div className="px-4 py-2 text-my_light font-bold uppercase cursor-pointer">hi {username} ! </div>
                      <div className="px-4 py-2 text-my_light font-bold uppercase cursor-pointer" onClick={handleLogOut}>Log out</div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/Log"
                    className="flex items-center justify-center px-6 text-2xl font-medium text-my_red border border-my_red uppercase"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden absolute w-full bg-myBlack bg-my_light">
        <div className="px-2 pb-3 pt-2 text-center bg-my_light my_transition shadow-2xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => handleClick(item)}
              aria-current={item.current ? "page" : undefined}
              className="block px-3 py-2 text-md font-bold text-my_red"
            >
              {item.name}
            </Link>
          ))}
          {!isLoged && (
            <Link
              href="/Log"
              className="flex items-center justify-center px-4 mx-auto my-3 text-md font-medium text-my_red border border-my_red uppercase w-fit"
            >
              Login
            </Link>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Nav;
