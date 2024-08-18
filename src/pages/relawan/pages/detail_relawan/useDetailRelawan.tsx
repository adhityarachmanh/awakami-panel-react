import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import RelawanService from "../../services/RelawanService";
import {
  JABATAN_POSKO_OPTIONS,
  JENIS_KELAMIN_OPTIONS,
  WARGA_KAWIN_OPTIONS,
} from "@/constants/app_constant";
import { PostQuery } from "@/types/PostQuery";
import { ColumnType } from "@/components/table/types/ColumnModel";
import { TPSRelawanModel } from "../../types/RelawanModel";
import TableTPSRelawanAction from "../../components/TableTPSRelawanAction";

const useDetailRelawan = (id: number) => {
  const navigate = useNavigate();
  const relawanService = new RelawanService();
  const relawanQuery = useQuery({
    queryKey: ["relawan-detail", id],
    queryFn: () => relawanService.getDetail(id),
  });
  const tpsColumns: ColumnType<TPSRelawanModel>[] = [
    {
      field: "id",
      headerName: "ID",
      buildClientValue: (data: TPSRelawanModel) => {
        return data.tps.id.toString();
      },
      valueFormatter: (data: TPSRelawanModel) => {
        return data.tps.id.toString();
      },
    },
    {
      field: "nomor",
      headerName: "Nomor",
      buildClientValue: (data: TPSRelawanModel) => {
        return data.tps.nomor;
      },
      valueFormatter: (data: TPSRelawanModel) => {
        return data.tps.nomor;
      },
    },
    {
      field: "alamat",
      headerName: "Alamat",
      buildClientValue: (data: TPSRelawanModel) => {
        return data.tps.alamat;
      },
      valueFormatter: (data: TPSRelawanModel) => {
        return data.tps.alamat;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      renderCell: (data: TPSRelawanModel) => {
        return <TableTPSRelawanAction data={data} />;
      },
    },
  ];

  const getJenisKelamin = (key: string | undefined): string => {
    if (!key) return "-";
    return JENIS_KELAMIN_OPTIONS[key as keyof typeof JENIS_KELAMIN_OPTIONS];
  };
  const getStatusPerkawinan = (key: string | undefined): string => {
    if (!key) return "-";
    return WARGA_KAWIN_OPTIONS[key as keyof typeof WARGA_KAWIN_OPTIONS];
  };
  const getJabatanPosko = (key: string | undefined): string => {
    if (!key) return "-";
    return JABATAN_POSKO_OPTIONS[key as keyof typeof JABATAN_POSKO_OPTIONS];
  };
  const tpsService = (_: PostQuery) => {
    return relawanService.getTPSRelawan(id);
  };
  return {
    relawanQuery,
    tpsColumns,
    navigate,
    tpsService,
    getJenisKelamin,
    getStatusPerkawinan,
    getJabatanPosko,
  };
};

export default useDetailRelawan;
