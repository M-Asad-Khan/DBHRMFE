import React from 'react'

const view = () => {
  return (
  
        <CContainer fluid>
        <CRow>
          <CCol sm="6">
            <CCard>
              <CCardHeader>
                Header
              </CCardHeader>
              <CCardBody>
                Body.
              </CCardBody>
              <CCardFooter>
                Footer.
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol sm="6">
            <CCard>
              <CCardHeader>
                Header
              </CCardHeader>
              <CCardBody>
                <CCardTitle>
                  Title.
                </CCardTitle>
                <CCardSubtitle>
                  Subtitle.
                </CCardSubtitle>
                <CCardText>
                  Text text text text text text text text.
                </CCardText>
              </CCardBody>
              <CCardFooter>
                Footer.
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
      )
  
}

export default view
