import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Typography from "../../components/Typography";
import { colors } from "../../styles/colors";
import { RootState } from "../../redux/types";
import Edit from "./edit";
import DOMPurify from "dompurify";
import { Button } from "../../components/Button";
import { ObjType } from "./type";
import { dataLoading } from "../../redux/configuration/config.action";
import { setProduct } from "../../redux/product/product.action";
import { getProducts } from "../../services/product";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
  gap: 4rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  .tab-card {
    max-width: 60rem;
  }
`;

const ProductImage = styled.img`
  height: 20rem;
  width: 20rem;
  margin-bottom: 5rem;
`;

const Card = styled.div`
  border-radius: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-direction: column;
  min-width: 40rem;
  background: #f8f8ff;
`;

const CardHeading = styled.div`
  border-bottom: 1px solid ${colors.gray2};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`;
const TabWrapper = styled.div`
  .nav-wrapper {
    display: flex;
    width: 100%;
    gap: 2rem;
  }
`;

const TabNav = styled.div`
  cursor: pointer;
  flex-grow: 1;
`;

const Caption = styled(Typography)`
  border-radius: 2rem;
  text-align: center;
  border: 1px solid ${colors.gray2Medium};
  color: ${colors.gray2Medium};
  padding: 0.5rem 2rem;
`;

const Attribute = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0rem 2rem;
`;

const Product = () => {
  const [isDescription, setIsDescription] = useState(true);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { product, isLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dataLoading();
    getProducts(setProduct, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (isLoading) {
    return <Typography>Loading product, please wait...</Typography>;
  }

  if (error) {
    return (
      <Typography>
        OOPS...., unable to load product, please check your network and reload
      </Typography>
    );
  }

  return (
    <>
      {product && (
        <Wrapper>
          {isOpen && <Edit onClose={onClose} />}
          <div>
            <Card
              style={{
                marginBottom: "2rem",
              }}
            >
              <ProductImage src={product.picture} />
              <Typography size="3.6rem" lineHeight="5rem">
                {product.name}
              </Typography>
              <Typography size="2rem" weight="400">
                {product.type.name}
              </Typography>
            </Card>
            <Button
              style={{
                margin: "1rem",
                textAlign: "left",
              }}
              onClick={openModal}
            >
              Edit
            </Button>
            <Card className="tab-card">
              <TabWrapper>
                <CardHeading className="nav-wrapper">
                  <TabNav>
                    <Typography
                      align="center"
                      size="2.5rem"
                      color={
                        isDescription
                          ? `${colors.link}`
                          : `${colors.textHeading}`
                      }
                      onClick={() => {
                        setIsDescription(true);
                      }}
                    >
                      Description
                    </Typography>
                  </TabNav>
                  <TabNav>
                    <Typography
                      align="center"
                      size="2.5rem"
                      color={
                        !isDescription
                          ? `${colors.link}`
                          : `${colors.textHeading}`
                      }
                      onClick={() => {
                        setIsDescription(false);
                      }}
                    >
                      Attributes
                    </Typography>
                  </TabNav>
                </CardHeading>
                {isDescription ? (
                  <Typography
                    size="1.5rem"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description),
                    }}
                  />
                ) : (
                  <>
                    <Typography color={colors.textHeading}>
                      Categories
                    </Typography>
                    <Attribute>
                      {product.categories.map(({ id, name }: ObjType) => (
                        <Caption key={id} size="1.4rem">
                          {name}
                        </Caption>
                      ))}
                    </Attribute>
                    <Typography color={colors.textHeading}>
                      Bussiness models
                    </Typography>
                    <Attribute>
                      {product.businessModels.map(({ id, name }: ObjType) => (
                        <Caption size="1.4rem" key={id}>
                          {name}
                        </Caption>
                      ))}
                    </Attribute>
                    <Typography color={colors.textHeading}>TRL</Typography>
                    <Attribute>
                      <Caption size="1.4rem">{product.trl.name}</Caption>
                    </Attribute>
                  </>
                )}
              </TabWrapper>
            </Card>
          </div>

          <div>
            <Card
              style={{
                marginBottom: "2rem",
              }}
            >
              <ProductImage src={product.user.profilePicture} />
              <Typography size="2rem" lineHeight="3rem">
                {product.user.firstName} {product.user.lastName}
              </Typography>
              <Typography weight="400">{product.company.name}</Typography>
            </Card>
            <Card
              style={{
                alignItems: "flex-start",
              }}
            >
              <CardHeading>
                <Typography
                  size="2rem"
                  lineHeight="3rem"
                  color={colors.textHeading}
                >
                  Company Address
                </Typography>
              </CardHeading>
              <Typography size="1.8rem" lineHeight="3rem">
                City: {product.company.address.city.name}
              </Typography>
              <Typography size="1.8rem" lineHeight="3rem">
                Country: {product.company.address.country.name}
              </Typography>
              <Typography size="1.8rem" lineHeight="3rem">
                ZipCode: {product.company.address.zipCode}
              </Typography>
              <Typography size="1.8rem" lineHeight="3rem">
                Street: {product.company.address.street}
              </Typography>
            </Card>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Product;
