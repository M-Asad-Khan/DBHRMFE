import { updateShowSidebar } from "./appSidebar.types";


export const updateShowSidebarAction = (params) => {
  return {
    type: updateShowSidebar,
    payload: params,
  };
};
