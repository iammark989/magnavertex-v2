<?php

namespace Database\Seeders;

use App\Models\BusinessSolution;
use Illuminate\Database\Seeder;

class BusinessSolutionSeeder extends Seeder
{
    public function run(): void
    {
        $solutions = [
            [
                'title' => 'Retail & Inventory Management System',
                'slug' => 'retail-inventory-management-system',
                'category' => 'ecommerce',
                'short_description' => 'An integrated system for managing products, inventory, sales, purchasing, and daily retail operations.',
                'business_challenge' => 'Many retail businesses rely on spreadsheets and disconnected applications to manage inventory, sales, and purchasing. This can lead to inaccurate stock records, inefficient operations, and difficulty monitoring business performance.',
                'solution_description' => 'A centralized business management system that connects product management, inventory monitoring, purchasing, sales transactions, and reporting. It helps business owners and employees manage daily operations while maintaining more accurate and organized business records.',
                'ideal_for' => 'Small and medium-sized retailers, wholesalers, distributors, and businesses managing multiple products, warehouses, or branches.',
                'technologies' => [
                    'Laravel',
                    'React',
                    'TypeScript',
                    'MySQL',
                    'Tailwind CSS',
                ],
                'featured_image' => null,
                'demo_url' => null,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
                'capabilities' => [
                    [
                        'title' => 'Product & Variant Management',
                        'description' => 'Organize product information, categories, brands, SKUs, and product variations.',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Inventory Monitoring',
                        'description' => 'Monitor stock quantities, warehouse inventory, stock movements, and adjustments.',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Sales & POS Management',
                        'description' => 'Record sales transactions, manage POS operations, and monitor daily sales.',
                        'sort_order' => 3,
                    ],
                    [
                        'title' => 'Purchasing Management',
                        'description' => 'Manage suppliers, purchase orders, and goods receiving.',
                        'sort_order' => 4,
                    ],
                    [
                        'title' => 'Reports & Analytics',
                        'description' => 'Access business reports and sales and inventory summaries.',
                        'sort_order' => 5,
                    ],
                ],
            ],
            [
                'title' => 'Recruitment & Applicant Management System',
                'slug' => 'recruitment-applicant-management-system',
                'category' => 'recruitment',
                'short_description' => 'A recruitment platform for managing job postings, applicant information, candidate screening, and hiring workflows.',
                'business_challenge' => 'Managing recruitment through email, spreadsheets, and manual records can make it difficult to organize applications, track candidate progress, and coordinate hiring activities.',
                'solution_description' => 'A centralized recruitment platform that helps organizations publish job opportunities, receive applications, organize candidate profiles, and monitor applicants throughout the hiring process.',
                'ideal_for' => 'Small and medium-sized businesses, recruitment teams, HR departments, and organizations with regular hiring requirements.',
                'technologies' => [
                    'Laravel',
                    'React',
                    'TypeScript',
                    'MySQL',
                    'Tailwind CSS',
                ],
                'featured_image' => null,
                'demo_url' => null,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
                'capabilities' => [
                    [
                        'title' => 'Job Posting Management',
                        'description' => 'Create, update, and organize job vacancies with descriptions and qualifications.',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Applicant Management',
                        'description' => 'Store applicant profiles, contact information, resumes, and application details.',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Application Tracking',
                        'description' => 'Track candidate progress through different recruitment stages.',
                        'sort_order' => 3,
                    ],
                    [
                        'title' => 'Candidate Screening',
                        'description' => 'Organize candidate qualifications and screening notes for easier evaluation.',
                        'sort_order' => 4,
                    ],
                    [
                        'title' => 'Recruitment Reports',
                        'description' => 'Review application activity, vacancy status, and recruitment progress.',
                        'sort_order' => 5,
                    ],
                ],
            ],
        ];

        foreach ($solutions as $data) {
            $capabilities = $data['capabilities'];

            unset($data['capabilities']);

            $solution = BusinessSolution::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );

            // Rebuild capabilities when this seeder is executed again.
            $solution->capabilities()->delete();

            $solution->capabilities()->createMany($capabilities);
        }
    }
}
