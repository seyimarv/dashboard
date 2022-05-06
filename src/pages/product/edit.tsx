import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Typography from "../../components/Typography";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import DOMPurify from "dompurify";
import { colors } from "../../styles/colors";
import TrlDropdown from "./trl-dropdown";
import { Button } from "../../components/Button";
import { editData } from "../../services/product";
import { setProduct } from "../../redux/product/product.action";

const Wrapper = styled.div`
position: fixed;
top: 0;
left: 0;
background: red:
width: 100vw;
height: 100%;
backdrop-filter: blur(4px);
z-index: 1100;
right: 0;
display: grid;
place-items: center;
`;

const Modal = styled.div`
  border-radius: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  width: 100%;
  max-height: 70rem;
  background: white;
  max-width: 100rem;
  background: #f8f8ff;
  overflow-y: scroll;
  margin: 0rem 2rem;
  .wrapper-class {
    padding: 1rem;
    border: 1px solid #ccc;
    margin: 2rem 0rem;
  }
  .editor-class {
    background-color: ${colors.gray2};
    padding: 1rem;
    border: 1px solid #ccc;
    font-size: 1.5rem;
  }
  .toolbar-class {
    border: 1px solid #ccc;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.link};
  padding-bottom: 1rem;
`;

const ModalBody = styled.div`
  padding: 4rem 0rem;
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: flex-end;
`;
const Input = styled.input`
  border: 1px solid ${colors.link};
  padding: 1rem;
  background-color: #ffff;
  border-radius: 10px;
  width: 30rem;
  font-size: 1.5rem;
  ::placeholder {
    color: ${colors.textBody};
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2.4rem;
  }
`;
const Attribute = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0rem 2rem;
`;

interface props {
    onClose: () => void
}

const Edit = ({ onClose }: props) => {
  const product = useSelector((state: RootState) => state.product.product);
  const { trl, categories, description, businessModels } = product;
  const dispatch = useDispatch();
  const blocksFromHTML = convertFromHTML(DOMPurify.sanitize(description));
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [models, setModels] = useState(businessModels);
  const [newCategories, setCategories] = useState(categories);
  const [selectedTrl, setSelectedTrl] = useState(trl);
  const [loading, setLoading] = useState(false);

  const [contentState, setContentState] = useState(
    EditorState.createWithContent(content)
  );
  const onChangeModels = useCallback(
    (id: number, value: any) => {
      const newModels = models.map((obj: any) => {
        if (obj.id === id) {
          return { ...obj, name: value };
        }
        return obj;
      });
      setModels(newModels);
    },
    [models]
  );

  const onChangeCategories = useCallback(
    (id: number, value: any) => {
      const categories = newCategories.map((obj: any) => {
        if (obj.id === id) {
          return { ...obj, name: value };
        }
        return obj;
      });
      setCategories(categories);
    },
    [newCategories]
  );

  const onSave = async () => {
    setLoading(true);
    await editData(setProduct, dispatch, {
      ...product,
      trl: selectedTrl,
      categories: newCategories,
      businessModels: models,
    });
    setLoading(false);
    onClose()
  };
  return (
    <Wrapper>
      <Modal>
        <ModalHeader>
          <Typography>Edit Product Details</Typography>
          <Button onClick={onClose}>Close</Button>
        </ModalHeader>
        <ModalBody>
          <Typography color={colors.textHeading}>Description</Typography>
          <Editor
            editorState={contentState}
            onEditorStateChange={setContentState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          <Typography color={colors.textHeading}>Business Models</Typography>
          <Attribute>
            {models.map(({ id, name }: any) => (
              <Input
                key={id}
                value={name}
                onChange={(event) => onChangeModels(id, event.target.value)}
              />
            ))}
          </Attribute>
          <Typography color={colors.textHeading}>Categories</Typography>
          <Attribute>
            {newCategories.map(({ id, name }: any) => (
              <Input
                key={id}
                value={name}
                onChange={(event) => onChangeCategories(id, event.target.value)}
              />
            ))}
          </Attribute>
          <Typography color={colors.textHeading}>Trl</Typography>
          <TrlDropdown
            selectedTrl={selectedTrl}
            setSelectedTrl={setSelectedTrl}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onSave}
            style={{
              marginTop: "4rem",
            }}
          >
            {
                !loading ? <>Save</> : <>Saving</>
            }
          </Button>
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
};

export default Edit;
