import React, { useState } from 'react'

import Bucket from '../Styled/Bucket';
import { ContentWrapper, DropdownWrapper } from './styles'
import { useClickAway } from "../../utils/hooks";

const Dropdown = ({ trigger, content }) => {
   const [isOpen, setIsOpen] = useState(false);
   
   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   }
   
   const hideDropdown = () => {
      setIsOpen(false);
   }
   const ref = useClickAway(hideDropdown);

   return (
      <DropdownWrapper ref={ref}>
         <Bucket onClick={toggleDropdown}>
         { trigger }
         </Bucket>
         <ContentWrapper isOpen={isOpen}>
            {content}
         </ContentWrapper>
      </DropdownWrapper>
   )
}

export default Dropdown
