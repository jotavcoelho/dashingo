import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const isWide = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex
      as="header" 
      w="100%" 
      maxW={1128}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      <Logo />

      {isWide && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWide} />
      </Flex>
    </Flex>
  );
}