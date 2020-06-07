package service

import (
	"errors"
	"inventory/database"
	"inventory/model"
	"inventory/repository"
	"strings"
)

func AddCustomer(customer model.Customer) (model.Customer, error) {
	customer.Shipper = strings.TrimSpace(customer.Shipper)
	if customer.Shipper == "" {
		return model.Customer{}, errors.New("出货人不能为空")
	}

	if customer.SaleDate <= 0 {
		return model.Customer{}, errors.New("销售时间不正确")
	}

	if customer.DeliveryDate <= 0 {
		return model.Customer{}, errors.New("送货时间不正确")
	}

	customer.Model = strings.TrimSpace(customer.Model)
	if customer.Model == "" {
		return model.Customer{}, errors.New("型号不能为空")
	}

	customer.Name = strings.TrimSpace(customer.Name)
	if customer.Name == "" {
		return model.Customer{}, errors.New("顾客姓名不能为空")
	}

	customer.Phone = strings.TrimSpace(customer.Phone)
	if customer.Phone == "" {
		return model.Customer{}, errors.New("联系电话不能为空")
	}

	customer.Address = strings.TrimSpace(customer.Address)
	if customer.Address == "" {
		return model.Customer{}, errors.New("送货地址不能为空")
	}

	customer.Remarks = strings.TrimSpace(customer.Remarks)
	customer.Id = GetId()

	db := database.DB

	return repository.AddCustomer(db, customer)
}

func GetCustomers(shipper string, begin int, end int, all bool) ([]model.Customer, error) {
	db := database.DB
	return repository.GetCustomer(db, shipper, begin, end, all)
}

func GetCustomerShippers() ([]string, error) {
	db := database.DB
	return repository.GetCustomerShippers(db)
}

func EditCustomerRemarks(id int64, remarks string) error {
	db := database.DB
	return repository.EditCustomerRemarks(db, id, strings.TrimSpace(remarks))
}

func EditCustomer(customer model.Customer) (model.Customer, error) {
	if customer.Id <= 0 {
		return model.Customer{}, errors.New("id不正确")
	}

	customer.Shipper = strings.TrimSpace(customer.Shipper)
	if customer.Shipper == "" {
		return model.Customer{}, errors.New("出货人不能为空")
	}

	if customer.SaleDate <= 0 {
		return model.Customer{}, errors.New("销售时间不正确")
	}

	if customer.DeliveryDate <= 0 {
		return model.Customer{}, errors.New("送货时间不正确")
	}

	customer.Model = strings.TrimSpace(customer.Model)
	if customer.Model == "" {
		return model.Customer{}, errors.New("型号不能为空")
	}

	customer.Name = strings.TrimSpace(customer.Name)
	if customer.Name == "" {
		return model.Customer{}, errors.New("顾客姓名不能为空")
	}

	customer.Phone = strings.TrimSpace(customer.Phone)
	if customer.Phone == "" {
		return model.Customer{}, errors.New("联系电话不能为空")
	}

	customer.Address = strings.TrimSpace(customer.Address)
	if customer.Address == "" {
		return model.Customer{}, errors.New("送货地址不能为空")
	}

	customer.Remarks = strings.TrimSpace(customer.Remarks)

	db := database.DB
	return customer, repository.EditCustomer(db, customer)
}
