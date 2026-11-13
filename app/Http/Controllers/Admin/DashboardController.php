<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessSolution;
use App\Models\ContactInquiry;
use App\Models\Service;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/Dashboard', [
            'dashboardSummary' => [
                'services' => Service::count(),
                'businessSolutions' => BusinessSolution::count(),
                'users' => User::count(),
            ],

            'contactSummary' => [
                'total' => ContactInquiry::count(),
                'unread' => ContactInquiry::whereNull('read_at')->count(),
                'new' => ContactInquiry::where('status', 'new')->count(),
                'in_progress' => ContactInquiry::where('status', 'in_progress')->count(),
                'responded' => ContactInquiry::where('status', 'responded')->count(),
                'closed' => ContactInquiry::where('status', 'closed')->count(),
            ],

            'recentInquiries' => ContactInquiry::query()
                ->latest()
                ->take(5)
                ->get([
                    'id',
                    'name',
                    'email',
                    'subject',
                    'project_type',
                    'status',
                    'read_at',
                    'created_at',
                ]),
        ]);
    }
}