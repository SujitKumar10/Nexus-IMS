package com.learn.nexus_ims.services;

import com.learn.nexus_ims.dtos.InvoiceDto;
import com.learn.nexus_ims.entities.Invoice;
import com.learn.nexus_ims.repositories.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ModelMapper modelMapper;

    /**
     * Create a new invoice
     */
    public InvoiceDto createInvoice(InvoiceDto invoiceDto) {
        Invoice invoice = modelMapper.map(invoiceDto, Invoice.class);
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return modelMapper.map(savedInvoice, InvoiceDto.class);
    }

    /**
     * Get all invoices
     */
    public List<InvoiceDto> getAllInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .map(invoice -> modelMapper.map(invoice, InvoiceDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get invoice by ID
     */
    public InvoiceDto getInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + id));
        return modelMapper.map(invoice, InvoiceDto.class);
    }

    /**
     * Update an invoice
     */
    public InvoiceDto updateInvoice(Long id, InvoiceDto invoiceDto) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + id));

        invoice.setInvoiceNo(invoiceDto.getInvoiceNo());
        invoice.setEstimatedId(invoiceDto.getEstimatedId());
        invoice.setChainId(invoiceDto.getChainId());
        invoice.setServiceDetails(invoiceDto.getServiceDetails());
        invoice.setQty(invoiceDto.getQty());
        invoice.setCostPerQty(invoiceDto.getCostPerQty());
        invoice.setAmountPayable(invoiceDto.getAmountPayable());
        invoice.setBalance(invoiceDto.getBalance());
        invoice.setDateOfPayment(invoiceDto.getDateOfPayment());
        invoice.setDateOfService(invoiceDto.getDateOfService());
        invoice.setDeliveryDetails(invoiceDto.getDeliveryDetails());
        invoice.setEmailId(invoiceDto.getEmailId());

        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return modelMapper.map(updatedInvoice, InvoiceDto.class);
    }

    /**
     * Delete an invoice
     */
    public void deleteInvoice(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new RuntimeException("Invoice not found with ID: " + id);
        }
        invoiceRepository.deleteById(id);
    }

    /**
     * Get invoices by invoice number
     */
    public InvoiceDto getInvoiceByInvoiceNo(Integer invoiceNo) {
        Invoice invoice = invoiceRepository.findByInvoiceNo(invoiceNo)
                .orElseThrow(() -> new RuntimeException("Invoice not found with Invoice No: " + invoiceNo));
        return modelMapper.map(invoice, InvoiceDto.class);
    }

    /**
     * Get invoices by estimated ID
     */
    public List<InvoiceDto> getInvoicesByEstimatedId(Long estimatedId) {
        return invoiceRepository.findByEstimatedId(estimatedId)
                .stream()
                .map(invoice -> modelMapper.map(invoice, InvoiceDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get invoices by chain ID
     */
    public List<InvoiceDto> getInvoicesByChainId(Long chainId) {
        return invoiceRepository.findByChainId(chainId)
                .stream()
                .map(invoice -> modelMapper.map(invoice, InvoiceDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get invoices by email ID
     */
    public List<InvoiceDto> getInvoicesByEmailId(String emailId) {
        return invoiceRepository.findByEmailId(emailId)
                .stream()
                .map(invoice -> modelMapper.map(invoice, InvoiceDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get invoices by service details
     */
    public List<InvoiceDto> getInvoicesByServiceDetails(String serviceDetails) {
        return invoiceRepository.findByServiceDetails(serviceDetails)
                .stream()
                .map(invoice -> modelMapper.map(invoice, InvoiceDto.class))
                .collect(Collectors.toList());
    }
}
