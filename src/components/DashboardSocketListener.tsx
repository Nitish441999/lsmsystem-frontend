import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { socket } from "@/utils/socket";
import { Lead } from "@/types/lead";

import { addWebsiteLead } from "@/fethure/website/websiteSlice";
import { addGoogleLead } from "@/fethure/googleAdds/googleAddSlice";
import { addMetaLead } from "@/fethure/metaAdds/metaAddSlice";
import { addRealtimeLead } from "@/fethure/dashboard/dashboardSlice";

export function DashboardSocketListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleWebsiteLead = (lead: Lead) => {
      dispatch(addWebsiteLead(lead));
      dispatch(addRealtimeLead(lead));
    };

    const handleGoogleLead = (lead: Lead) => {
      dispatch(addGoogleLead(lead));
      dispatch(addRealtimeLead(lead));
    };

    const handleMetaLead = (lead: Lead) => {
      dispatch(addMetaLead(lead));
      dispatch(addRealtimeLead(lead));
    };

    socket.on("websiteLeadCreated", handleWebsiteLead);
    socket.on("googleLeadCreated", handleGoogleLead);
    socket.on("metaLeadCreated", handleMetaLead);

    return () => {
      socket.off("websiteLeadCreated", handleWebsiteLead);
      socket.off("googleLeadCreated", handleGoogleLead);
      socket.off("metaLeadCreated", handleMetaLead);
    };
  }, [dispatch]);

  return null;
}
