import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Typography from "../../components/Typography";
import { getTrl } from "../../services/product";
import { colors } from "../../styles/colors";
import { ObjType } from "./type";

const DropdownContainer = styled.div`
  position: absolute;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  left: 0;
  top: auto;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
  background: white;
  margin: 1rem 0rem;
  max-width: 30rem;
  padding: 0.5rem;
  max-height: 50rem;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Option = styled(Typography)<{ selected: boolean }>`
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? colors.gray2 : "")};
`;

const SelectLabel = styled(Typography)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

interface props {
  selectedTrl: ObjType;
  setSelectedTrl: (data: ObjType) => void;
}

const TrlDropdown = ({ selectedTrl, setSelectedTrl }: props) => {
  const [trlList, setTrlList] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (trl: ObjType) => {
    setSelectedTrl(trl);
  };
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getList = async () => {
      const response = await getTrl();
      if (response) {
        setTrlList(response.data);
      }
    };
    getList();
  }, [dispatch]);

  return (
    <Wrapper>
      <DropdownContainer>
        <SelectLabel
          size="1.5rem"
          style={{
            padding: "1rem",
          }}
          onClick={toggleOpen}
        >
          Select Trl
          <div>{!isOpen ? <> &#8595;</> : <>&#8593;</>}</div>
        </SelectLabel>
        {isOpen && (
          <>
            {trlList &&
              trlList.map(({ id, name }: ObjType) => (
                <Option
                  size="1rem"
                  selected={selectedTrl.id === id}
                  key={id}
                  onClick={() => onSelect({ id, name })}
                >
                  {name}
                </Option>
              ))}
          </>
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default TrlDropdown;
