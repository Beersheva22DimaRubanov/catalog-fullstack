import { Delete, Edit, Info } from "@mui/icons-material"
import { Box, Modal } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { Product } from "../../models/Product"
import { useRef, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { CommonForm } from "../forms/CommonForm";
import { CommonInfo } from "../../models/CommonInfo";
import { restService } from "../../config/serviceConfig";
import { Confirm } from "../common/Confirm";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [openEdit, setFlagEdit] = useState(false);
  const [openDetails, setFlagDetails] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentProduct = useRef<Product | undefined>();
  const confirmTitle = useRef<string>('');
  const confirmContent = useRef<string>('');
  const confirmFn = useRef<any>(null);
  function getColumns() {
    const columns: GridColDef[] =
      [{
        field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
      },
      {
        field: 'name', headerName: 'Product', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
      },
      {
        field: 'category', headerName: 'Category', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
      },
      {
        field: 'price', headerName: 'Price', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
      }
      ]
    const actions: GridColDef[] = [
      {
        field: 'actions', headerName: 'Actions', type: "actions", flex: 0.5, getActions: (params) => {
          return [
            <GridActionsCellItem label="remove" icon={<Delete />}
              onClick={() => {
                currentProduct.current = params.row
                removeCurrent(currentProduct.current?.id);
              }
              } />,
            <GridActionsCellItem label="update" icon={<Edit />}
              onClick={() => {
                currentProduct.current = params.row;
                    setFlagEdit(true)
                
                console.log('Update')

              }} />,
            <GridActionsCellItem label="info" icon={<Info />}
              onClick={() => {
                currentProduct.current = params.row
                console.log(currentProduct.current?.data)
                setFlagDetails(true)
              }} />

          ];
        }
      }
    ]
    return columns.concat(actions);
  }

  function removeCurrent(id: any) {
    confirmTitle.current = "Remove announcement object?";
    confirmContent.current = `You are going remove employee with id ${currentProduct.current?.id}`;
    confirmFn.current = actualRemove;
    setOpenConfirm(true);
  }
  async function actualRemove(isOk: boolean) {
    let errorMessage: string = '';
    if (isOk) {
      try {
        await restService.deleteById(currentProduct.current?.id);
      } catch (error: any) {
        errorMessage = error;
      }
    }
    // dispatch(errorMessage, '');
    setOpenConfirm(false);
  }
 async function updateProduct(product: Product):Promise<void>  {
    setFlagEdit(false)
    // const res: InputResult = { status: 'error', message: '' };
    if (JSON.stringify(currentProduct.current) != JSON.stringify(product)) {
      confirmTitle.current = "Update Employee object?";
      currentProduct.current = product;
      confirmContent.current = `You are going update employee with id ${currentProduct.current!.id}`;
      confirmFn.current = actualUpdate;
      setOpenConfirm(true);
    }
    // return Promise.resolve(res);
  }
  async function actualUpdate(isOk: boolean) {

    let errorMessage: string = '';
    if (isOk) {
      try {
        await restService.updateById(currentProduct.current?.id, currentProduct.current!);
      } catch (error: any) {
        errorMessage = error
      }
    }
    // dispatch(errorMessage, '');
    setOpenConfirm(false);

  }

  function cardAction(isDelete: boolean) {
    if (isDelete) {
      removeCurrent(currentProduct.current!);
    } else {
      setFlagEdit(true);
    }
    setFlagDetails(false);
  }
  
  return <Box>
    <DataGrid
      rows={products}
      columns={getColumns()}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />

<Confirm confirmFn={confirmFn.current} open={openConfirm}
            title={confirmTitle.current} content={confirmContent.current}></Confirm>
    <Modal
      open={openEdit}
      onClose={() => setFlagEdit(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CommonForm submitFn={updateProduct} productUpdated={currentProduct.current} ></CommonForm>
      </Box>
    </Modal>
    <Modal
      open={openDetails}
      onClose={() => setFlagDetails(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <ProductCard actionFn={cardAction} product={currentProduct.current!} />
      </Box>
    </Modal>
  </Box>
}

export default ProductTable

