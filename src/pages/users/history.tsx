import React, { Suspense, useEffect, useState } from "react";
import {
  getAllOrder,
  getAllOrderByUser,
  OrderType,
} from "services/order.service";
import { UserData } from "redux/types";
import { Box, Header, Icon, List, Modal, Page, Tabs, Text, useNavigate } from "zmp-ui";

const HistoryPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [allOrder, setALlOrder] = useState<OrderType[]>([]);
  const [allOrderStatus1, setALlOrderStatus1] = useState<OrderType[]>([]);
  const [allOrderStatus2, setALlOrderStatus2] = useState<OrderType[]>([]);
  const [allOrderStatus3, setALlOrderStatus3] = useState<OrderType[]>([]);



  //variant
  //

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedData = localStorage.getItem("userLogin");

        const parsedData: UserData = JSON.parse(storedData || "");
        const getOrder = await getAllOrderByUser(parsedData.idZalo);
        setALlOrder(getOrder);
        const filteredOrder1 = getOrder.filter(order => (order.status || '').toLowerCase() === "đang vận chuyển");
        setALlOrderStatus1(filteredOrder1)
        const filteredOrder2 = getOrder.filter(order => (order.status || '').toLowerCase() === "giao thành công");
        setALlOrderStatus2(filteredOrder2)
        const filteredOrder3 = getOrder.filter(order => (order.status || '').toLowerCase() === "giao thất bại");
        setALlOrderStatus3(filteredOrder3)
        // console.log('te', getOrder)
      } catch (error) {
        // console.error("Failed to fetch categories:", error);
        // You could also display a message to the user or log the error to a logging service
      }
    };
    fetchCategories();
  }, []);

  return (
    <Page className="relative flex-1 flex flex-col bg-white session-order">
      <Header className="header-order" title="Quản lý đơn hàng" backIcon={<Icon icon="zi-arrow-left" />} showBackIcon={true} textColor="white" />

      <Box className="container-ad flex-1 overflow-auto">
        <Box className="category">
          <Tabs id="contact-list"
           scrollable>            
            <Tabs.Tab key="tab1" label="Tất cả">
              <List>
                <>
                  {allOrder.map((row, index) => (
                    row.item.length > 1 ? (
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px'
                      }}>
                        {row.item.map((item, itemIndex) => (
                          <List.Item
                            key={row.id}
                            prefix={<img
                                src= {item?.img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={item?.name}
                            subTitle={'Số lượng: '+item?.quantity}
                            suffix={<div style={{
                                  display: 'inline-flex',
                                  flexDirection:'column'
                                }}>
                              <span>{formatter.format(Number(item?.price)*Number(item?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />
                        ))}
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    ):(
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px',
                        margin: '10px 0'
                      }}>
                        <List.Item
                            key={row.id}
                            prefix={<img
                                src= {row?.item[0].img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={row?.item[0].name}
                            subTitle={'Số lượng: '+row?.item[0].quantity}
                            suffix={<div style={{
                              display: 'inline-flex',
                              flexDirection:'column'
                            }}>
                              <span>{formatter.format(Number(row?.item[0]?.price)*Number(row?.item[0]?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />                    
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    )
                  ))}
                </>
              </List>
            </Tabs.Tab>
            <Tabs.Tab key="tab2" label="Đang vận chuyển">
            <List>
                <>
                  {allOrderStatus1.map((row, index) => (
                    row.item.length > 1 ? (
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px'
                      }}>
                        {row.item.map((item, itemIndex) => (
                          <List.Item
                            key={row.id}
                            prefix={<img
                                src= {item?.img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={item?.name}
                            subTitle={'Số lượng: '+item?.quantity}
                            suffix={<div style={{
                                  display: 'inline-flex',
                                  flexDirection:'column'
                                }}>
                              <span>{formatter.format(Number(item?.price)*Number(item?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />
                        ))}
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    ):(
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px',
                        margin: '10px 0'
                      }}>
                        <List.Item
                            key={row.id}
                            prefix={<img
                                src= {row?.item[0].img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={row?.item[0].name}
                            subTitle={'Số lượng: '+row?.item[0].quantity}
                            suffix={<div style={{
                              display: 'inline-flex',
                              flexDirection:'column'
                            }}>
                              <span>{formatter.format(Number(row?.item[0]?.price)*Number(row?.item[0]?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />                    
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    )
                  ))}
                </>
              </List>
            </Tabs.Tab>
            <Tabs.Tab key="tab3" label="Giao thành công">
            <List>
                <>
                  {allOrderStatus2.map((row, index) => (
                    row.item.length > 1 ? (
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px'
                      }}>
                        {row.item.map((item, itemIndex) => (
                          <List.Item
                            key={row.id}
                            prefix={<img
                                src= {item?.img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={item?.name}
                            subTitle={'Số lượng: '+item?.quantity}
                            suffix={<div style={{
                                  display: 'inline-flex',
                                  flexDirection:'column'
                                }}>
                              <span>{formatter.format(Number(item?.price)*Number(item?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />
                        ))}
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    ):(
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px',
                        margin: '10px 0'
                      }}>
                        <List.Item
                            key={row.id}
                            prefix={<img
                                src= {row?.item[0].img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={row?.item[0].name}
                            subTitle={'Số lượng: '+row?.item[0].quantity}
                            suffix={<div style={{
                              display: 'inline-flex',
                              flexDirection:'column'
                            }}>
                              <span>{formatter.format(Number(row?.item[0]?.price)*Number(row?.item[0]?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />                    
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    )
                  ))}
                </>
              </List>
            </Tabs.Tab>
            <Tabs.Tab key="tab4" label="Giao thất bại">
            <List>
                <>
                  {allOrderStatus3.map((row, index) => (
                    row.item.length > 1 ? (
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px'
                      }}>
                        {row.item.map((item, itemIndex) => (
                          <List.Item
                            key={row.id}
                            prefix={<img
                                src= {item?.img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={item?.name}
                            subTitle={'Số lượng: '+item?.quantity}
                            suffix={<div style={{
                                  display: 'inline-flex',
                                  flexDirection:'column'
                                }}>
                              <span>{formatter.format(Number(item?.price)*Number(item?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />
                        ))}
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    ):(
                      <div style={{
                        background:'#fff',
                        height:'fit-content',
                        padding: '5px 0px',
                        borderRadius:'20px',
                        margin: '10px 0'
                      }}>
                        <List.Item
                            key={row.id}
                            prefix={<img
                                src= {row?.item[0].img || "https://th.bing.com/th/id/OIP.kfWhyaG94y1jeVYqMXujdwHaHx?rs=1&pid=ImgDetMain"} 
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />}
                            title={row?.item[0].name}
                            subTitle={'Số lượng: '+row?.item[0].quantity}
                            suffix={<div style={{
                              display: 'inline-flex',
                              flexDirection:'column'
                            }}>
                              <span>{formatter.format(Number(row?.item[0]?.price)*Number(row?.item[0]?.quantity))}</span>
                              <span>{row?.status}</span>
                            </div>}                        
                          />                    
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tổng đơn: </strong>
                          <span>{formatter.format(Number(row?.amount))}</span>
                        </div>
                        <div style={{
                          padding: '0px 20px',
                          display: 'inline-flex',
                          justifyContent:'space-between',
                          width: '100%',
                          fontSize:'1rem'
                        }}>
                          <strong>Tình trạng: </strong>
                          <span>{row?.status}</span>
                        </div>
                      </div>
                    )
                  ))}
                </>
              </List>
            </Tabs.Tab>
          </Tabs>
        </Box>
      </Box>

     
    </Page>
  );
};

export default HistoryPage;
