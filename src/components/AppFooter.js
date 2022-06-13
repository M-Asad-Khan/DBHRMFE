import React from 'react'
import { CFooter } from '@coreui/react'
import { useHistory } from 'react-router-dom'

const AppFooter = () => {
  const history = useHistory();
  return (
    <CFooter>
      <div>
        <a onClick={()=> history.push('/dashboard')} rel="noopener noreferrer">
          HRM
        </a>
        <span className="ms-1">&copy; 2022 DevBox</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a onClick={()=> history.push('/dashboard')} rel="noopener noreferrer">
          DevBox Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
