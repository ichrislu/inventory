package service

import (
	"errors"
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddCustomer(customer model.Customer) (model.Customer, error) {
	if customer.Shipper == "" {
		return model.Customer{}, errors.New("出货人不能为空")
	}

	if customer.SaleDate <= 0 {
		return model.Customer{}, errors.New("销售时间不正确")
	}

	if customer.DeliveryDate <= 0 {
		return model.Customer{}, errors.New("送货时间不正确")
	}

	if customer.Model == "" {
		return model.Customer{}, errors.New("型号不能为空")
	}

	if customer.Name == "" {
		return model.Customer{}, errors.New("顾客姓名不能为空")
	}

	if customer.Phone == "" {
		return model.Customer{}, errors.New("联系电话不能为空")
	}

	if customer.Address == "" {
		return model.Customer{}, errors.New("送货地址不能为空")
	}

	customer.Id = GetId()

	db := database.DB

	return dao.AddCustomer(db, customer)
}

func GetCustomers(shipper string, begin int, end int, all bool) ([]model.Customer, error) {
	db := database.DB
	return dao.GetCustomer(db, shipper, begin, end, all)
}

func GetCustomerShippers() ([]string, error) {
	db := database.DB
	return dao.GetCustomerShippers(db)
}

func EditCustomerRemarks(id int64, remarks string) error {
	db := database.DB
	return dao.EditCustomerRemarks(db, id, remarks)
}

func EditCustomer(customer model.Customer) (model.Customer, error) {
	if customer.Id <= 0 {
		return model.Customer{}, errors.New("id不正确")
	}

	if customer.Shipper == "" {
		return model.Customer{}, errors.New("出货人不能为空")
	}

	if customer.SaleDate <= 0 {
		return model.Customer{}, errors.New("销售时间不正确")
	}

	if customer.DeliveryDate <= 0 {
		return model.Customer{}, errors.New("送货时间不正确")
	}

	if customer.Model == "" {
		return model.Customer{}, errors.New("型号不能为空")
	}

	if customer.Name == "" {
		return model.Customer{}, errors.New("顾客姓名不能为空")
	}

	if customer.Phone == "" {
		return model.Customer{}, errors.New("联系电话不能为空")
	}

	if customer.Address == "" {
		return model.Customer{}, errors.New("送货地址不能为空")
	}

	db := database.DB
	return customer, dao.EditCustomer(db, customer)
}
