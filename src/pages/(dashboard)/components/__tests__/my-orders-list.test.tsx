import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyOrdersList from "../my-orders-list";
import { BrowserRouter } from "react-router-dom";
import type { OrderResponse } from "../../../../services/myorders-service";

const mockOrders: OrderResponse['orders'] = [
    {
        "_id": "673622619a305b99cf97630e",
        "userId": "1235",
        "parentOrderId": "87b06ad8-5d9f-4832-b8b5-5af2a326db86",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T16:16:22.307Z",
                    "message_id": "6ce50055-81b2-450f-8a3a-3a5538673033",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T16:16:22.307Z",
                        "message_id": "6ce50055-81b2-450f-8a3a-3a5538673033",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "6ce50055-81b2-450f-8a3a-3a5538673033",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.877Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Completed Order",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Beep"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "1000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Pen-testing Service",
                                            "description": "Pen-testing Service",
                                            "longDescription": "Pen-testing Service",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T16:16:22.744Z",
                                        "updated_at": "2024-11-14T16:16:22.744Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "1000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "1000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "1000",
                                                    "currency": "INR"
                                                },
                                                "title": "Beep",
                                                "@ondc/org/item_id": "ceb1a058-9d8f-4b19-bd9b-c91b9be2140e",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$ohbSPkIVz.iFTin7B2Wg0OSUt/p4EeJC2J4M.KK0g2Y5lftQXttp2",
                                    "created_at": "2024-11-14T18:27:57.626Z",
                                    "updated_at": "2024-11-14T18:27:57.626Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    },
    {
        "_id": "673623d09a305b99cf976328",
        "userId": "1235",
        "parentOrderId": "22ea6dac-f0f2-42d1-913c-5bd4bf638e20",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T16:22:29.534Z",
                    "message_id": "bcb37f9d-3af2-48fa-ae68-500ace8a07a1",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T16:22:29.534Z",
                        "message_id": "bcb37f9d-3af2-48fa-ae68-500ace8a07a1",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "bcb37f9d-3af2-48fa-ae68-500ace8a07a1",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.879Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Completed Order",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Test-Ml-Model"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "0"
                                            },
                                            "category_id": "ML Model",
                                            "productSubcategory1": "Pen-testing Service",
                                            "description": "desc",
                                            "longDescription": "desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T16:22:29.986Z",
                                        "updated_at": "2024-11-14T16:22:29.986Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "0",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "0",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Test-Ml-Model",
                                                "@ondc/org/item_id": "ec72c738-f066-4d60-a30c-d66e3eb7c3c8",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$iJedO6p/n9pblIT7xer2TuQq9erDMQwlz8o30Xo4GnaK6r0bLyFn2",
                                    "created_at": "2024-11-14T18:27:57.648Z",
                                    "updated_at": "2024-11-14T18:27:57.648Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    },
    {
        "_id": "67362b8b9a305b99cf9763a5",
        "userId": "1235",
        "parentOrderId": "3ca9feb3-856d-4c75-9a7d-83be850d3105",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T16:55:28.857Z",
                    "message_id": "d72b6189-4123-43d9-8477-42e1daefe70d",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T16:55:28.857Z",
                        "message_id": "d72b6189-4123-43d9-8477-42e1daefe70d",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "d72b6189-4123-43d9-8477-42e1daefe70d",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.702Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Deliverable Uploaded",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Beep"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "1000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Pen-testing Service",
                                            "description": "Pen-testing Service",
                                            "longDescription": "Pen-testing Service",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T16:55:29.231Z",
                                        "updated_at": "2024-11-14T16:55:29.231Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "1000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "1000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "1000",
                                                    "currency": "INR"
                                                },
                                                "title": "Beep",
                                                "@ondc/org/item_id": "ceb1a058-9d8f-4b19-bd9b-c91b9be2140e",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$mmf/ACaEE.bsto6q5KfztOVoq69gHPs8N7jy5iGWPBFNIP02zOWGO",
                                    "created_at": "2024-11-14T18:27:57.617Z",
                                    "updated_at": "2024-11-14T18:27:57.617Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    },
    {
        "_id": "67362d669a305b99cf976418",
        "userId": "1235",
        "parentOrderId": "1896576f-e0a9-465b-9f3b-78443a2899da",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T17:03:23.796Z",
                    "message_id": "ee4584ed-d230-40f9-a6e0-56400fad4790",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T17:03:23.796Z",
                        "message_id": "ee4584ed-d230-40f9-a6e0-56400fad4790",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "ee4584ed-d230-40f9-a6e0-56400fad4790",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.792Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Accepted",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "Beep"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "1000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Pen-testing Service",
                                            "description": "Pen-testing Service",
                                            "longDescription": "Pen-testing Service",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T17:03:24.252Z",
                                        "updated_at": "2024-11-14T17:03:24.252Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "1000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "1000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "1000",
                                                    "currency": "INR"
                                                },
                                                "title": "Beep",
                                                "@ondc/org/item_id": "ceb1a058-9d8f-4b19-bd9b-c91b9be2140e",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$f6AtHqox.pd2lkPDLhe9rOnHKDD8pRx2kSNkwXVBv5SiTU4oO1o/y",
                                    "created_at": "2024-11-14T18:27:57.638Z",
                                    "updated_at": "2024-11-14T18:27:57.638Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    },
    {
        "_id": "673635649a305b99cf9765d3",
        "userId": "1235",
        "parentOrderId": "4a3c1f64-4048-42cf-bc8e-cbc7177a50bf",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T17:37:29.140Z",
                    "message_id": "bfb1384a-5edf-4fea-8988-f216a8e922ff",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T17:37:29.140Z",
                        "message_id": "bfb1384a-5edf-4fea-8988-f216a8e922ff",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "bfb1384a-5edf-4fea-8988-f216a8e922ff",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.875Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Created",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Assurance & Assessment Service",
                                            "description": "Assurance & Assessment Service",
                                            "longDescription": "Assurance & Assessment Service",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Validation & Verification Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Remediation Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Pentesting Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Feature Addition",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "RomRaider"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "TAVOSS Version & Certification Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T17:37:29.700Z",
                                        "updated_at": "2024-11-14T17:37:29.700Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "66000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "f3b1b54e-021f-4816-93fa-02a2e3dbb27f",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "70ea1ece-f8d8-47ac-bd2a-25449550e22a",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "46b10375-aaf8-4df4-9fe1-106358adb2bf",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "b04c6cd1-614f-41b2-8928-e215035c73ea",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "4644d529-6068-4a66-bdf7-010b092e510c",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "RomRaider",
                                                "@ondc/org/item_id": "c46af1cc-e2c4-41b7-b8eb-f0ee92e3e010",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$S3eGe7xDRWlugdwB6yltxuvOiHPGZVcltt8Q3QDvPC4Owx3XCIyMG",
                                    "created_at": "2024-11-14T18:27:57.626Z",
                                    "updated_at": "2024-11-14T18:27:57.626Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    },
    {
        "_id": "673640529a305b99cf976798",
        "userId": "1235",
        "parentOrderId": "82397d14-37f3-4b0f-b442-517c6145e391",
        "orders": [
            {
                "context": {
                    "ttl": "PT10M",
                    "action": "confirm",
                    "timestamp": "2024-11-14T18:24:07.162Z",
                    "message_id": "7ea07c80-c9de-48bd-8d7b-ccdf05b37002",
                    "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                    "domain": "Software Assurance",
                    "version": "1.1.0",
                    "bap_id": "bap.ossverse.com",
                    "bap_uri": "http://bap.ossverse.com",
                    "location": {
                        "country": {
                            "name": "India",
                            "code": "IND"
                        },
                        "city": {
                            "name": "Bengaluru",
                            "code": "std:080"
                        }
                    },
                    "bpp_id": "openfort-oasp.ossverse.com",
                    "bpp_uri": "http://openfort-oasp.ossverse.com"
                },
                "message": {
                    "context": {
                        "ttl": "PT10M",
                        "action": "confirm",
                        "timestamp": "2024-11-14T18:24:07.162Z",
                        "message_id": "7ea07c80-c9de-48bd-8d7b-ccdf05b37002",
                        "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                        "domain": "Software Assurance",
                        "version": "1.1.0",
                        "bap_id": "bap.ossverse.com",
                        "bap_uri": "http://bap.ossverse.com",
                        "location": {
                            "country": {
                                "name": "India",
                                "code": "IND"
                            },
                            "city": {
                                "name": "Bengaluru",
                                "code": "std:080"
                            }
                        },
                        "bpp_id": "openfort-oasp.ossverse.com",
                        "bpp_uri": "http://openfort-oasp.ossverse.com"
                    },
                    "responses": [
                        {
                            "context": {
                                "domain": "Software Assurance",
                                "action": "on_status",
                                "version": "1.1.0",
                                "bpp_id": "openfort-oasp.ossverse.com",
                                "bpp_uri": "http://openfort-oasp.ossverse.com",
                                "country": "IND",
                                "city": "std:080",
                                "location": {
                                    "country": {
                                        "name": "India",
                                        "code": "IND"
                                    },
                                    "city": {
                                        "name": "Bengaluru",
                                        "code": "std:080"
                                    }
                                },
                                "bap_id": "bap.ossverse.com",
                                "bap_uri": "http://bap.ossverse.com",
                                "transaction_id": "ead489b8-81de-49a4-baf6-8d8de7eabf32",
                                "message_id": "7ea07c80-c9de-48bd-8d7b-ccdf05b37002",
                                "ttl": "PT10M",
                                "timestamp": "2024-11-14T18:28:07.722Z"
                            },
                            "message": {
                                "order": {
                                    "provider": {
                                        "id": "60b97451-aa57-41b5-a9c3-e84a97471e23",
                                        "locations": [
                                            {
                                                "country": {
                                                    "name": "India",
                                                    "code": "IND"
                                                },
                                                "city": {
                                                    "name": "Bengaluru",
                                                    "code": "std:080"
                                                }
                                            }
                                        ]
                                    },
                                    "state": "Created",
                                    "items": [
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Assurance & Assessment Service",
                                            "description": "Assurance & Assessment Service",
                                            "longDescription": "Assurance & Assessment Service",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Validation & Verification Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Remediation Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Pentesting Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "Feature Addition",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        },
                                        {
                                            "descriptor": {
                                                "name": "SmartEVSE-3"
                                            },
                                            "price": {
                                                "currency": "INR",
                                                "value": "11000"
                                            },
                                            "category_id": "OSS Project",
                                            "productSubcategory1": "TAVOSS Version & Certification Service",
                                            "description": "desc",
                                            "longDescription": "long-desc",
                                            "quantity": {
                                                "count": 1,
                                                "measure": {
                                                    "unit": "Unit-count",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ],
                                    "billing": {
                                        "tax_number": "22AAAAA0000A1Z5",
                                        "phone": "0987654321",
                                        "email": "openfort2@example.com",
                                        "created_at": "2024-11-14T18:24:07.606Z",
                                        "updated_at": "2024-11-14T18:24:07.606Z"
                                    },
                                    "fulfillments": [],
                                    "quote": {
                                        "ttl": "P1D",
                                        "price": {
                                            "value": "66000",
                                            "currency": "INR"
                                        },
                                        "breakup": [
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "11dba10f-a120-4ec6-b366-179f4acbe6e5",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "d2144f3f-2033-4323-ba0c-2bc522cd9a69",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "c573d5d1-c6a0-4374-94bd-e28faec5fc20",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "c23bc237-824a-4960-8514-6cfed4ed1d8a",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "4f997970-afa6-4829-9c27-054d1d7bc22d",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "item": {
                                                    "price": {
                                                        "value": "11000",
                                                        "currency": "INR"
                                                    }
                                                },
                                                "price": {
                                                    "value": "11000",
                                                    "currency": "INR"
                                                },
                                                "title": "SmartEVSE-3",
                                                "@ondc/org/item_id": "dcb98651-d71d-4264-a87b-d117c3897ff4",
                                                "@ondc/org/title_type": "item",
                                                "@ondc/org/item_quantity": {
                                                    "count": 1
                                                }
                                            },
                                            {
                                                "price": {
                                                    "value": "0",
                                                    "currency": "INR"
                                                },
                                                "title": "Delivery charges",
                                                "@ondc/org/item_id": "fullfillment_id_0",
                                                "@ondc/org/title_type": "delivery"
                                            }
                                        ]
                                    },
                                    "payment": {
                                        "@ondc/org/settlement_details": [
                                            {
                                                "bank_name": "Bank of Springfield",
                                                "branch_name": "Main Branch",
                                                "settlement_type": "neft",
                                                "beneficiary_name": "openfort",
                                                "settlement_phase": "sale-amount",
                                                "settlement_ifsc_code": "IFSC0001234",
                                                "settlement_counterparty": "seller-app",
                                                "settlement_bank_account_no": "1234567890"
                                            }
                                        ],
                                        "@ondc/org/buyer_app_finder_fee_type": "Percent",
                                        "@ondc/org/buyer_app_finder_fee_amount": "3.0"
                                    },
                                    "id": "order-$2a$10$f6CQn1aKzkMSKaxKQizJduE6JbOpdBtDbtkK7Qy21q/EjtS4Gzq12",
                                    "created_at": "2024-11-14T18:27:57.620Z",
                                    "updated_at": "2024-11-14T18:27:57.620Z",
                                    "type": "DEFAULT"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "__v": 0
    }
];;
describe("MyOrdersList", () => {
    it("should render the orders list", () => {
        render(
            <BrowserRouter>
                <MyOrdersList
                    orders={mockOrders}
                    setFilterSortPager={() => {
                        return { category_id: [], productSubcategory1: [], price: 0 };
                    }}
                    filterSortPager={{
                        category_id: [],
                        productSubcategory1: [],
                        price: 0,
                        total: 0,
                        page: 1,
                        pageSize: 10,
                        sort: "Last Update",
                        order: -1,
                    }}
                    showFilter={false}
                    showGrid={false}
                />
            </BrowserRouter>,
        );

        expect(screen.getByText("Test-Ml-Model")).toBeInTheDocument();
        expect(screen.getByText("RomRaider")).toBeInTheDocument();
    });

    // it('should render "No orders found" when orders array is empty', () => {
    //     render(<MyOrdersList orders={[]} showFilter={false} showGrid={false} />);

    //     expect(screen.getByText("No orders found")).toBeInTheDocument();
    // });
});
